import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import { useCauses } from "@ribon.io/shared/hooks";
import { Cause, Offer } from "@ribon.io/shared/types";
import { useNavigation } from "hooks/useNavigation";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/GroupButtons";
import { theme } from "@ribon.io/shared/styles";
import { View, Text, Platform, Linking } from "react-native";
import { ScrollView } from "react-native";
import Button from "components/atomics/buttons/Button";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import S from "./styles";
import SelectOfferSection from "./SelectOfferSection";

function CardScreen(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>({
    currency: "usd",
    price: "10",
    priceValue: 10,
    id: 1,
    active: true,
    subscription: false,
    priceCents: 1000,
    positionOrder: 0,
  } as Offer);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setOfferId, setFlow, loading } =
    useCardPaymentInformation();

  const { causes } = useCauses();
  const { cause: causeCrypto } = useCryptoPayment();
  const { scrollEnabled } = useScrollEnabled();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(causeCrypto || causesFilter()[0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    setCause(causeClicked);
  };

  const handleDonateClick = () => {
    if (Platform.OS === "ios") {
      const url = `https://dapp.ribon.io/promoters/checkout?target=cause&target_id=${cause?.id}&currency=${currentOffer.currency}&offer=${currentOfferIndex}`;
      Linking.openURL(url);
    } else {
      setFlow("cause");
      logEvent("giveCauseBtn_start", {
        from: "giveCauseCC_page",
        causeId: cause?.id,
        price: currentOffer.priceValue,
        currency: currentOffer.currency,
      });

      navigateTo("CheckoutScreen", {
        target: "cause",
        targetId: cause?.id,
        offer: currentOfferIndex,
        currency: currentOffer.currency,
      });
    }
  };

  const handleCommunityAddClick = () => {
    navigateTo("CommunityAddModal", {
      amount: formatPrice(currentOffer?.priceValue, currentOffer?.currency),
    });
  };

  const communityAddText = () => {
    if (!currentOffer) return "-";
    const PERCENTAGE_OF_INCREASE = 0.2;

    return `+ ${formatPrice(
      currentOffer.priceValue * PERCENTAGE_OF_INCREASE,
      currentOffer.currency,
    )}`;
  };

  const handleOfferChange = (offer: Offer, index: number) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
    setCurrentOfferIndex(index);
  };

  if (!currentOffer || loading) return <View />;

  const preSelectedIndex = () =>
    causeCrypto ? causesFilter().findIndex((c) => c.id === causeCrypto?.id) : 0;

  return (
    <ScrollView
      contentContainerStyle={S.container}
      scrollEnabled={scrollEnabled}
    >
      <Text style={S.title}>{t("title")}</Text>
      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        indexSelected={preSelectedIndex()}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.brand.secondary[700]}
        textColorOutline={theme.colors.brand.secondary[700]}
        borderColor={theme.colors.brand.secondary[700]}
        borderColorOutline={theme.colors.brand.secondary[300]}
      />
      <View style={S.contentContainer}>
        <MaskedWaveCut imageStyles={S.supportImage} image={cause?.coverImage} />

        <View style={S.donateContainer}>
          <View style={S.givingContainer}>
            <View style={S.contributionContainer}>
              <SelectOfferSection
                cause={cause}
                onOfferChange={handleOfferChange}
              />
            </View>
            <View style={S.communityAddContainer}>
              <Text style={S.communityAddText}>{t("communityAddText")}</Text>
              <Text style={S.communityAddValue}>{communityAddText()}</Text>
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
          <Button
            text={t("donateButtonText", {
              value: removeInsignificantZeros(currentOffer.price),
            })}
            onPress={handleDonateClick}
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
        </View>
      </View>
      <UserSupportBanner from="giveCauseCC_page" />
    </ScrollView>
  );
}

export default CardScreen;
