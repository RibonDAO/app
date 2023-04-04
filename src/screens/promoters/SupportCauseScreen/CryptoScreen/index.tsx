import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { useCauses } from "@ribon.io/shared/hooks";
import { Cause } from "@ribon.io/shared/types";
import { useWalletContext } from "contexts/walletContext";
import {
  INITIAL_AMOUNT,
  useCryptoPayment,
} from "contexts/cryptoPaymentContext";
import GroupButtons from "components/moleculars/GroupButtons";
import { theme } from "@ribon.io/shared/styles";
import { Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native";
import Button from "components/atomics/buttons/Button";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { logError } from "services/crashReport";
import { useNavigation } from "hooks/useNavigation";
import UserSupportSection from "components/moleculars/UserSupportSection";
import { showToast } from "lib/Toast";
import { useNetworkContext } from "contexts/networkContext";
import { defaultNetwork, validNetwork } from "config/networks";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import SelectCryptoOfferSection from "./SelectCryptoOfferSection";

function CryptoScreen(): JSX.Element {
  const { connectWallet, wallet } = useWalletContext();
  const { currentNetwork } = useNetworkContext();
  const {
    cause,
    setCause,
    amount,
    setAmount,
    disableButton,
    handleDonationToContract,
    userBalance,
    tokenSymbol,
    loading: loadingCryptoPayment,
    setLoading,
    setCurrentPool,
  } = useCryptoPayment();
  const { navigateTo } = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const { causes, refetch: refetchCauses } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  useEffect(() => {
    logEvent("causeSupportScreen_view");
  }, []);

  const invalidNetwork = () => !validNetwork(currentNetwork.chainId);

  useFocusEffect(
    useCallback(() => {
      if (invalidNetwork())
        showToast(
          `${t("invalidNetwork", { network: defaultNetwork.chainName })}`,
        );
    }, [currentNetwork.chainId]),
  );

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(causesFilter()[0]);
  }, [JSON.stringify(causes)]);

  useEffect(() => {
    if (cause?.pools && cause?.pools[0])
      setCurrentPool(cause?.pools[0].address);
  }, [cause]);

  const resetScreen = () => {
    async function reset() {
      try {
        setRefreshing(true);
        await refetchCauses();
        setAmount(INITIAL_AMOUNT);
        setLoading(false);
      } catch (error) {
        logError(error);
      } finally {
        setRefreshing(false);
      }
    }

    reset();
  };

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("supportCauseSelection_click", {
      id: causeClicked?.id,
    });

    setCause(causeClicked);
  };

  const onDonationToContractSuccess = () => {
    logEvent("toastNotification_view", {
      status: "transactionProcessed",
    });
    resetScreen();
    navigateTo("ContributionDoneScreen", {
      cause,
    });
  };

  const handleDonateClick = async () => {
    if (wallet) {
      await handleDonationToContract(onDonationToContractSuccess);
      return;
    }

    connectWallet();
    logEvent("treasureComCicleBtn_click");
  };

  const handleCommunityAddClick = () => {
    navigateTo("CommunityAddModal", { amount: `${amount} ${tokenSymbol}` });
  };

  const communityAddText = () => {
    const PERCENTAGE_OF_INCREASE = 0.2;

    return `+ ${(Number(amount) * PERCENTAGE_OF_INCREASE).toFixed(
      2,
    )} ${tokenSymbol}`;
  };

  const donateButtonText = () => {
    if (invalidNetwork())
      return t("invalidNetwork", { network: defaultNetwork.chainName });
    if (loadingCryptoPayment) return "...";
    if (wallet)
      return t("donateButtonText", { value: `${amount} ${tokenSymbol}` });

    return t("connectWalletButtonText");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={resetScreen} />
      }
    >
      <Text style={styles.title}>{t("title")}</Text>
      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.brand.secondary[700]}
        textColorOutline={theme.colors.brand.secondary[700]}
        borderColor={theme.colors.brand.secondary[700]}
        borderColorOutline={theme.colors.brand.secondary[300]}
        indexSelected={0}
      />
      <View style={styles.contentContainer}>
        <MaskedWaveCut
          image={cause?.coverImage}
          imageStyles={styles.supportImage}
        />
        <View style={styles.donateContainer}>
          <View style={styles.givingContainer}>
            <View style={styles.contributionContainer}>
              <SelectCryptoOfferSection
                cause={cause}
                onValueChange={(value: string) => setAmount(value)}
              />
            </View>
            <View style={styles.communityAddContainer}>
              <Text style={styles.communityAddText}>
                {t("communityAddText")}
              </Text>
              <Text style={styles.communityAddValue}>{communityAddText()}</Text>
              <Button
                text={t("communityAddButtonText")}
                onPress={handleCommunityAddClick}
                outline
                customStyles={{
                  borderColor: theme.colors.brand.secondary[700],
                  marginTop: theme.spacingNative(8),
                  paddingTop: theme.spacingNative(4),
                  paddingRight: theme.spacingNative(4),
                  paddingBottom: theme.spacingNative(4),
                  paddingLeft: theme.spacingNative(4),
                }}
                customTextStyles={{
                  color: theme.colors.brand.secondary[700],
                  fontSize: 11,
                }}
              />
            </View>
          </View>
          {wallet && !invalidNetwork() && (
            <Text style={styles.userBalanceText}>
              {t("userBalanceText")}
              {userBalance} {tokenSymbol}
            </Text>
          )}
          <Button
            text={donateButtonText()}
            onPress={handleDonateClick}
            disabled={disableButton() || invalidNetwork()}
            borderColor={theme.colors.brand.secondary[300]}
            backgroundColor={theme.colors.brand.secondary[300]}
            textColor={theme.colors.brand.secondary[700]}
            customTextStyles={{
              fontWeight: "600",
            }}
            customStyles={{
              height: 50,
            }}
          />
          <Text style={styles.refundText}>{t("refundText")}</Text>
        </View>
      </View>

      <UserSupportSection />
    </ScrollView>
  );
}

export default CryptoScreen;
