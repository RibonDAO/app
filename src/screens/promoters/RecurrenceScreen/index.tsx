import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { logEvent } from "services/analytics";
import LinkAccordion from "components/moleculars/LinkAccordion";
import { useNavigation } from "hooks/useNavigation";
import { useRouteParams } from "hooks/useRouteParams";
import S from "./styles";
import ModalButtonSelector from "../CheckoutScreen/Components/ModalButtonSelector";
import PriceSelection from "../CheckoutScreen/Components/PriceSelection";
import Header from "../CheckoutScreen/Components/Header";

export default function RecurrenceScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.recurrenceScreen",
  });

  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentIndex, setCurrentIndex] = useState<number>();

  const [offersModalVisible, setOffersModalVisible] = useState(false);

  const {
    target,
    targetId,
    offer,
    currency,
    setOffer,
    setTarget,
    setTargetId,
    setCurrency,
  } = useCheckoutContext();
  const payable = usePayable(target, targetId);
  const { navigateTo } = useNavigation();
  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currency?.toUpperCase() as keyof typeof Currencies],
    false,
  );

  const { params } = useRouteParams<"RecurrenceScreen">();

  const {
    target: targetParam,
    targetId: targetIdParam,
    offer: offerParam,
    currency: currencyParam,
  } = params;

  useEffect(() => {
    if (targetIdParam) setTargetId(targetIdParam);
    if (targetParam) setTarget(targetParam);
    if (currencyParam) setCurrency(currencyParam);
    if (offerParam != null) {
      setOffer(offerParam);
    }
  }, [targetParam, currencyParam, targetIdParam, offerParam, offers]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  useEffect(() => {
    if (offers && currentIndex !== undefined && !isLoadingOffers) {
      const actualOffer = offers[currentIndex];
      setOffer(actualOffer.priceCents);
    }
  }, [currentIndex]);

  const resetOffer = () => setOffer(offers[0].priceCents);

  useEffect(() => {
    if (offers && offer !== undefined && !isLoadingOffers) {
      const actualOffer = offers.find(
        (item: Offer) => item.priceCents === offer,
      );
      setCurrentOffer(actualOffer);
      if (!actualOffer) resetOffer();
    }
  }, [offers, offer, isLoadingOffers]);

  const handleOfferChange = (offerItem: any) => {
    const offerChanged = offers?.find(
      (item: Offer) => item.priceCents === offerItem.priceCents,
    );
    setOffer(offerChanged?.priceCents ?? 0);
  };

  const buttonOfferItems = offers?.map((offerItem: any) => ({
    label: offerItem.price,
    onClick: () => handleOfferChange(offerItem),
  }));

  const navigateToCheckout = (subscription: boolean) => {
    logEvent("P23_recurrenceSelect_click", {
      receiver: payable?.name,
      recurring: subscription ? "true" : "false",
      oneTime: subscription ? "false" : "true",
    });

    navigateTo("CheckoutScreen", {
      target: target ?? "",
      targetId: targetId ?? "",
      currency: currency ?? "",
      subscription,
      offer: currentOffer?.priceCents,
    });
  };

  const linksItems = [
    {
      title: t("recurrentDonationDescription"),
      leftIcon: "event_repeat",
      handleClick: () => navigateToCheckout(true),
    },
    {
      title: t("uniqueDonationDescription"),
      leftIcon: "event_available",
      handleClick: () => navigateToCheckout(false),
    },
  ];

  useEffect(() => {
    if (payable)
      logEvent("P23_recurrenceSelect_view", {
        target: payable?.name,
      });
  }, [payable]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={S.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
        style={S.outerContainer}
      >
        <ScrollView style={S.container}>
          <Header />
          <View style={S.container}>
            <ModalButtonSelector
              title={t("selectValue")}
              key="offerModal"
              current={offers.findIndex((item) => item.priceCents === offer)}
              setCurrentIndex={setCurrentIndex}
              items={buttonOfferItems}
              visible={offersModalVisible}
              setVisible={setOffersModalVisible}
            />

            <Text style={S.title}>
              {t("donatingTo")}
              <Text style={S.payableName}>{payable?.name}</Text>
            </Text>
            {currentOffer && (
              <PriceSelection
                currentOffer={currentOffer}
                onEditClick={() => setOffersModalVisible(true)}
              />
            )}
            <View>
              <Text style={S.pageTitle}>{t("title")}</Text>
              <LinkAccordion items={linksItems} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
