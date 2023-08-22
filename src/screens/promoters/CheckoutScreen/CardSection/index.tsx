import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer, NonProfit, Cause } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
import { useStripeContext } from "contexts/stripeContext";
import { useRouteParams } from "hooks/useRouteParams";
import Icon from "components/atomics/Icon";
import Button from "components/atomics/buttons/Button";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared/styles";
import { defaultBodyXsSemibold } from "styles/typography/default";
import RadioAccordion from "components/moleculars/RadioAccordion";
import ApplePayIcon from "../assets/ApplePayIcon";
import GooglePayIcon from "../assets/GooglePayIcon";
import CreditCardIcon from "../assets/CreditCardIcon";
import CreditCardForm from "../Components/CreditCardForm";
import PriceSelection from "../Components/PriceSelection";
import ModalButtonSelector from "../Components/ModalButtonSelector";
import ApplePaySection from "../Components/ApplePaySection";
import GooglePaySection from "../Components/GooglePaySection";
import S from "./styles";

export default function CardSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  // const { isApplePaySupported } = useApplePay();
  const { isGooglePaySupported } = useGooglePay();

  const { target, targetId, currency, setOfferPrice, offerPrice } =
    useCheckoutContext();
  const {
    handleSubmit,
    setOfferId,
    setCurrentCoin,
    setCause,
    setNonProfit,
    resetStates,
    setFlow,
  } = useCardPaymentInformation();
  const payable = usePayable(target, targetId);
  const { changePublishableKey } = useStripeContext();
  const { params } = useRouteParams<"CheckoutScreen">();

  const { offer: offerParam, subscription } = params;

  const [isSubscription, setIsSubscription] = useState(subscription);

  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [offersModalVisible, setOffersModalVisible] = useState(false);
  const [isGooglePaySupportedState, setIsGooglePaySupportedState] =
    useState<boolean>(false);

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

  useEffect(() => {
    resetStates();

    return () => {
      resetStates();
    };
  }, []);

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
    refetchOffers();
  }, [currency, isSubscription]);

  useEffect(() => {
    if (offerParam != null) {
      setOfferPrice(offerParam);
    }
  }, [offerParam]);

  useEffect(() => {
    if (offers && currentIndex !== undefined && !isLoadingOffers) {
      const actualOffer = offers[currentIndex];
      setOfferPrice(actualOffer?.priceCents ?? offers[0].priceCents);
    }
  }, [currentIndex, offers, isLoadingOffers]);

  useEffect(() => {
    if (currentOffer) {
      changePublishableKey(currentOffer.gateway);
      setOfferId(currentOffer.id);
      setCurrentCoin(
        Currencies[currency?.toUpperCase() as keyof typeof Currencies],
      );
    }
  }, [currentOffer]);

  useEffect(() => {
    if (!payable) return;

    if (target === "cause") {
      setNonProfit(undefined);
      setCause(payable as Cause);
      setFlow("cause");
    } else if (target === "non_profit") {
      setNonProfit(payable as NonProfit);
      setCause((payable as NonProfit).cause as Cause);
      setFlow("nonProfit");
    }
  }, [payable]);

  useEffect(() => {
    isGooglePaySupported().then((result) => {
      setIsGooglePaySupportedState(result);
    });
  }, []);

  const handleOfferChange = (offerItem: Offer) => {
    const offerChanged = offers?.find(
      (item: Offer) => item.priceCents === offerItem.priceCents,
    );
    setOfferPrice(offerChanged?.priceCents ?? offers[0].priceCents);
  };

  const buttonOfferItems = offers?.map((offerItem) => ({
    label: offerItem.price,
    onClick: () => handleOfferChange(offerItem),
  }));

  const handlePayment = () => {
    logEvent("confirmPaymentFormBtn_click", {
      target,
      targetId,
    });
    handleSubmit();
  };

  const onSubscriptionClick = () => {
    setIsSubscription(!isSubscription);

    if (payable)
      logEvent("P23_changeRecurrence_click", {
        receiver: payable?.name,
      });
  };

  const nonProfit = payable as NonProfit;
  const cause = target === "non_profit" ? nonProfit?.cause : payable;
  const actualNonProfit = target === "non_profit" ? nonProfit : undefined;

  return (
    <View style={S.container}>
      <ModalButtonSelector
        title={t("selectValue")}
        key="offerModal"
        current={offers.findIndex((item) => item.priceCents === offerPrice)}
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

      <View style={S.recurrenceContainer}>
        <Icon
          name={isSubscription ? "event_repeat" : "event_available"}
          size={25}
          color={theme.colors.brand.primary[600]}
          type="outlined"
        />
        <Text style={S.recurrenceTitle}>
          {isSubscription ? t("monthlyContribution") : t("uniqueContribution")}
        </Text>
        <Button
          text={t("recurrenceButton")}
          customTextStyles={{
            color: theme.colors.brand.primary[600],
            ...defaultBodyXsSemibold,
          }}
          onPress={() => onSubscriptionClick()}
          customStyles={S.donateButton}
          outline
        />
      </View>

      <Text style={S.accordionTitle}>
        {isSubscription ? t("subscription") : t("payment")}
      </Text>
      <RadioAccordion
        items={[
          {
            title: t("paymentMethodSection.creditCard"),
            children: currentOffer && (
              <CreditCardForm
                onSubmit={handlePayment}
                showFiscalFields={currentOffer?.gateway === "stripe"}
              />
            ),
            rightIcon: <CreditCardIcon />,
          },
          {
            title: t("paymentMethodSection.googlePay"),
            children: currentOffer && (
              <View>
                <GooglePaySection
                  offer={currentOffer as Offer}
                  nonProfit={actualNonProfit}
                  cause={cause as Cause}
                />
              </View>
            ),
            rightIcon: <GooglePayIcon />,
            show: isGooglePaySupportedState,
          },
          {
            title: t("paymentMethodSection.applePay"),
            children: currentOffer && (
              <View>
                <ApplePaySection
                  offer={currentOffer as Offer}
                  nonProfit={actualNonProfit}
                  cause={cause as Cause}
                />
              </View>
            ),
            rightIcon: <ApplePayIcon />,
            show: false,
          },
        ]}
      />
    </View>
  );
}
