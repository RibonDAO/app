import { Platform, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { useStripeContext } from "contexts/stripeContext";
import { useRouteParams } from "hooks/useRouteParams";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import RadioAccordion from "components/moleculars/RadioAccordion";
import { usePlatformPay } from "@stripe/stripe-react-native";
import TrustSeal from "components/moleculars/TrustSeal";
import CreditCardSection from "components/moleculars/PaymentMethods/CreditCardSection";
import GooglePaySection from "components/moleculars/PaymentMethods/GooglePaySection";
import ApplePaySection from "components/moleculars/PaymentMethods/ApplePaySection";
import PixSection from "components/moleculars/PaymentMethods/PixSection";
import ApplePayIcon from "../assets/ApplePayIcon";
import GooglePayIcon from "../assets/GooglePayIcon";
import CreditCardIcon from "../assets/CreditCardIcon";

import S from "./styles";
import PixIcon from "../assets/PixIcon";

export default function PaymentMethodSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters",
  });

  const {
    currency,
    setOfferPrice,
    offerPrice,
    setOffer,
    setCurrentCoin,
    resetStates,
  } = useCheckoutContext();

  const { handleSubmit } = useCardPaymentInformation();

  const { changePublishableKey } = useStripeContext();
  const { params } = useRouteParams<"CheckoutScreen">();

  const { offer: offerParam, subscription } = params;

  const [isSubscription, setIsSubscription] = useState(subscription);
  const { isPlatformPaySupported } = usePlatformPay();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [checkPlatformPaySupport, setCheckPlatformPaySupport] = useState(false);

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currency?.toUpperCase() as keyof typeof Currencies],
    isSubscription,
  );

  const resetOffer = () => {
    setOfferPrice(offers[0].priceCents);
    setCurrentOffer(offers[0]);
  };

  async function checkPlatformPay() {
    const isSupported = await isPlatformPaySupported();
    setCheckPlatformPaySupport(isSupported);
  }

  useEffect(() => {
    if (offers && offerPrice !== undefined && !isLoadingOffers) {
      const actualOffer = offers.find(
        (item: Offer) => item.priceCents === offerPrice,
      );

      setCurrentOffer(actualOffer);

      if (!actualOffer) resetOffer();
    }
  }, [offers, offerPrice, isLoadingOffers]);

  useEffect(() => {
    resetStates();

    return () => {
      resetStates();
    };
  }, []);

  useEffect(() => {
    refetchOffers();
  }, [currency, isSubscription]);

  useEffect(() => {
    if (offerParam != null) {
      setOfferPrice(offerParam);
    }
  }, [offerParam]);

  useEffect(() => {
    checkPlatformPay();
  }, [isPlatformPaySupported]);

  useEffect(() => {
    if (currentOffer) {
      changePublishableKey(currentOffer.gateway);
      setOffer(currentOffer);
      setCurrentCoin(
        Currencies[currency?.toUpperCase() as keyof typeof Currencies],
      );
    }
  }, [currentOffer]);

  const handlePayment = () => {
    handleSubmit();
  };

  const showPix = () => currentOffer?.currency === "brl";

  const showApplePay = () => Platform.OS === "ios";

  return (
    <>
      <View style={S.container}>
        <View style={S.recurrenceContainer}>
          <Icon
            name={isSubscription ? "event_repeat" : "event_available"}
            size={25}
            color={theme.colors.brand.primary[600]}
            type="outlined"
          />
          <Text style={S.recurrenceTitle}>
            {isSubscription
              ? t("club.checkoutScreen.monthlyContribution")
              : t("club.checkoutScreen.uniqueContribution")}
          </Text>
        </View>

        <Text style={S.accordionTitle}>{t("checkoutScreen.payment")}</Text>
        <RadioAccordion
          items={[
            {
              title: t("checkoutScreen.paymentMethodSection.creditCard"),
              children: currentOffer && (
                <CreditCardSection
                  onSubmit={handlePayment}
                  showFiscalFields={currentOffer?.gateway === "stripe"}
                />
              ),
              rightIcon: <CreditCardIcon />,
              onClick: () => setIsSubscription(true),
            },
            {
              title: t("checkoutScreen.paymentMethodSection.googlePay"),
              children: currentOffer && (
                <View>
                  <GooglePaySection
                    offer={currentOffer as Offer}
                    isSubscription={isSubscription}
                  />
                </View>
              ),
              rightIcon: <GooglePayIcon />,
              show: !showApplePay() && checkPlatformPaySupport,
              onClick: () => setIsSubscription(true),
            },
            {
              title: t("checkoutScreen.paymentMethodSection.applePay"),
              children: currentOffer && (
                <View>
                  <ApplePaySection
                    offer={currentOffer as Offer}
                    isSubscription={isSubscription}
                  />
                </View>
              ),
              rightIcon: <ApplePayIcon />,
              show: showApplePay() && checkPlatformPaySupport,
              onClick: () => setIsSubscription(true),
            },
            {
              title: t("checkoutScreen.paymentMethodSection.pix"),
              children: currentOffer && (
                <View>
                  <PixSection offer={currentOffer as Offer} />
                  <View style={S.infoTextContainer}>
                    <Text style={S.infoText}>
                      {t("club.checkoutScreen.pix")}
                    </Text>
                  </View>
                </View>
              ),
              rightIcon: <PixIcon />,
              show: showPix(),
              onClick: () => setIsSubscription(false),
            },
          ]}
        />
      </View>
      <TrustSeal />
      {isSubscription && (
        <View style={S.infoTextContainer}>
          <Text style={S.infoText}>
            {t("checkoutScreen.monthlyContributionInfo")}
          </Text>
        </View>
      )}
    </>
  );
}
