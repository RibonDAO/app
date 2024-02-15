import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
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
import { useNetworkContext } from "contexts/networkContext";
import { defaultNetwork } from "config/networks";
import { useCausesContext } from "contexts/causesContext";
import { useCauseContributionContext } from "contexts/causesContributionContext";
import { logEvent } from "services/analytics";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import { useCheckoutContext } from "contexts/checkoutContext";
import styles from "./styles";
import SelectCryptoOfferSection from "./SelectCryptoOfferSection";

function CryptoScreen(): JSX.Element {
  const { connectWallet, wallet } = useWalletContext();
  const { isValidNetwork, getCurrentNetwork } = useNetworkContext();
  const { cause: causeCard } = useCheckoutContext();

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
  const { causes, refetch: refetchCauses } = useCausesContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  const invalidNetwork = useCallback(() => !isValidNetwork, [isValidNetwork]);
  const donateButtonDisabled = useCallback(
    () => disableButton() || (invalidNetwork() && !!wallet),
    [wallet, invalidNetwork],
  );

  useEffect(() => {
    setCause(causeCard || (chosenCause as Cause));
  }, [JSON.stringify(causes)]);

  useEffect(() => {
    if (cause?.pools && cause?.pools[0])
      setCurrentPool(cause?.pools[0].address);
  }, [cause]);

  useEffect(() => {
    if (causes.length > 0) {
      logEvent("contributionCardsOrder_view", {
        causes: causes.map((c) => c.name).join(", "),
      });
    }
  }, [causes]);

  const resetScreen = () => {
    async function reset() {
      try {
        setRefreshing(true);
        getCurrentNetwork();
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

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCause(causeClicked);
    setChosenCauseIndex(index);
  };

  useEffect(() => {
    setCause(causeCard || (chosenCause as Cause));
  }, [causes]);

  const onDonationToContractSuccess = () => {
    resetScreen();

    logEvent("causeGave_end", {
      causeId: cause?.id,
      amount,
      source: "crypto",
    });

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
  };

  const handleCommunityAddClick = () => {
    navigateTo("CommunityAddModal", { amount: `${amount} ${tokenSymbol}` });
  };

  const communityAddText = () => {
    const PERCENTAGE_OF_INCREASE = 0.2;

    return `+ ${(Number(amount) * PERCENTAGE_OF_INCREASE).toFixed(2)} ${
      tokenSymbol || ""
    }`;
  };

  const donateButtonText = () => {
    if (loadingCryptoPayment) return "...";
    if (wallet) {
      if (invalidNetwork())
        return t("invalidNetwork", { network: defaultNetwork.chainName });

      return t("donateButtonText", { value: `${amount} ${tokenSymbol || ""}` });
    }

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
        elements={causes}
        onChange={handleCauseClick}
        nameExtractor={(element) => element.name}
        indexSelected={chosenCauseIndex}
        backgroundColor={theme.colors.brand.secondary[700]}
        textColorOutline={theme.colors.brand.secondary[700]}
        borderColor={theme.colors.brand.secondary[700]}
        borderColorOutline={theme.colors.brand.secondary[300]}
      />
      <View style={styles.contentContainer}>
        <MaskedWaveCut
          image={chosenCause?.coverImage}
          imageStyles={styles.supportImage}
        />
        <View style={styles.donateContainer}>
          <View style={styles.givingContainer}>
            <View style={styles.contributionContainer}>
              <SelectCryptoOfferSection
                cause={chosenCause}
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
              {userBalance} {tokenSymbol || ""}
            </Text>
          )}
          <Button
            text={donateButtonText()}
            onPress={handleDonateClick}
            disabled={donateButtonDisabled()}
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

      <View style={styles.supportSection}>
        <UserSupportBanner from="giveCauseCrypto_page" />
      </View>
    </ScrollView>
  );
}

export default CryptoScreen;
