import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";

import { Cause, Offer } from "@ribon.io/shared/types";
import { useNavigation } from "hooks/useNavigation";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import GroupButtons from "components/moleculars/GroupButtons";
import { theme } from "@ribon.io/shared/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import Button from "components/atomics/buttons/Button";
import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { useCausesContext } from "contexts/causesContext";
import { useCauseContributionContext } from "contexts/causesContributionContext";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import { useCheckoutContext } from "contexts/checkoutContext";
import ArrowLeft from "components/vectors/ArrowLeft";
import S from "./styles";
import SelectOfferSection from "./SelectOfferSection";

function CardScreen(): JSX.Element {
  const { navigateTo, popNavigation } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setFlow } = useCheckoutContext();

  const { causes } = useCausesContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();
  const { cause: causeCrypto } = useCryptoPayment();
  const { scrollEnabled } = useScrollEnabled();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  useEffect(() => {
    setCause(causeCrypto || chosenCause || causes[chosenCauseIndex ?? 0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCauseIndex(index);
    setChosenCause(causeClicked);
  };

  const handleDonateClick = () => {
    setFlow("cause");
    logEvent("giveCauseBtn_start", {
      from: "giveCauseCC_page",
      causeId: cause?.id,
      price: currentOffer?.priceValue,
      currency: currentOffer?.currency,
    });

    navigateTo("RecurrenceScreen", {
      target: "cause",
      targetId: cause?.id ?? causes[0].id,
      offer: currentOffer?.priceCents,
      currency: currentOffer?.currency,
    });
  };

  const handleCommunityAddClick = () => {
    if (!currentOffer) return;
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
    setCurrentOfferIndex(index);
  };

  return (
    <ScrollView
      contentContainerStyle={S.container}
      scrollEnabled={scrollEnabled}
    >
      <View style={S.arrow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => popNavigation()}
          testID="arrow-back-button"
        >
          <ArrowLeft color={theme.colors.brand.secondary[800]} />
        </TouchableOpacity>
      </View>
      <Text style={S.title}>{t("title")}</Text>
      <GroupButtons
        elements={causes}
        onChange={handleCauseClick}
        indexSelected={chosenCauseIndex}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.brand.secondary[700]}
        textColorOutline={theme.colors.brand.secondary[700]}
        borderColor={theme.colors.brand.secondary[700]}
        borderColorOutline={theme.colors.brand.secondary[300]}
      />
      <View style={S.contentContainer}>
        <MaskedWaveCut
          imageStyles={S.supportImage}
          image={chosenCause?.coverImage}
        />

        <View style={S.donateContainer}>
          <View style={S.givingContainer}>
            <View style={S.contributionContainer}>
              <SelectOfferSection
                cause={chosenCause}
                onOfferChange={handleOfferChange}
                currentIndex={currentOfferIndex}
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
              value: removeInsignificantZeros(currentOffer?.price || "0"),
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
      <View style={S.supportSection}>
        <UserSupportBanner from="giveCauseCC_page" />
      </View>
    </ScrollView>
  );
}

export default CardScreen;
