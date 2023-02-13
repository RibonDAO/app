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
import { View, Text } from "react-native";
import { ScrollView } from "react-native";
import Button from "components/atomics/buttons/Button";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import UserSupportSection from "components/moleculars/UserSupportItem";
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
  const { cause, setCause, setOfferId, setFlow, loading } =
    useCardPaymentInformation();

  const { causes } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(causesFilter()[0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("treasureCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const handleDonateClick = () => {
    setFlow("cause");
    logEvent("treasureComCicleBtn_click");
    navigateTo("PaymentScreen", {
      offer: currentOffer,
      flow: "cause",
      cause,
    });
  };

  const handleCommunityAddClick = () => {
    navigateTo("CommunityAddModal", {
      amount: currentOffer?.price,
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

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  if (!currentOffer || loading) return <View />;

  return (
    <ScrollView contentContainerStyle={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.orange40}
        textColorOutline={theme.colors.orange40}
        borderColor={theme.colors.orange40}
        borderColorOutline={theme.colors.orange20}
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
                  borderColor: theme.colors.orange40,
                  marginTop: theme.spacingNative(8),
                  paddingTop: theme.spacingNative(4),
                  paddingRight: theme.spacingNative(4),
                  paddingBottom: theme.spacingNative(4),
                  paddingLeft: theme.spacingNative(4),
                }}
                customTextStyles={{
                  color: theme.colors.orange40,
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
            borderColor={theme.colors.orange20}
            backgroundColor={theme.colors.orange20}
            textColor={theme.colors.orange40}
            customTextStyles={{
              fontWeight: "600",
            }}
            customStyles={{
              height: 50,
            }}
          />
        </View>
      </View>

      <UserSupportSection />
    </ScrollView>
  );
}

export default CardScreen;
