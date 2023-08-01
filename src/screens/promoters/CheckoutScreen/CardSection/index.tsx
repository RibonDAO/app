import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import RadioAccordion from "components/moleculars/RadioAccordion";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer, NonProfit, Cause } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { useGooglePay } from "@stripe/stripe-react-native";
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

  const { target, targetId, currency, offer, setOffer } = useCheckoutContext();
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

  useEffect(() => {
    resetStates();

    return () => {
      resetStates();
    };
  }, []);

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currency?.toUpperCase() as keyof typeof Currencies],
    false,
  );

  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const [offersModalVisible, setOffersModalVisible] = useState(false);
  const [isGooglePaySupportedState, setIsGooglePaySupportedState] =
    useState<boolean>(false);

  const resetOffer = () => setOffer(0);

  useEffect(() => {
    if (offers && offer !== undefined && !isLoadingOffers) {
      setCurrentOffer(offers[offer]);

      if (offers.length - 1 < offer) resetOffer();
    }
  }, [offers, offer, isLoadingOffers]);

  useEffect(() => {
    refetchOffers();
  }, [currency]);

  const handleOfferChange = (offerItem: any) => {
    const offerIndex = offers?.findIndex(
      (item: any) => item.id === offerItem.id,
    );
    setOffer(offerIndex);
  };

  const buttonOfferItems = offers?.map((offerItem) => ({
    label: offerItem.price,
    onClick: () => handleOfferChange(offerItem),
  }));

  const handlePayment = () => {
    handleSubmit();
  };

  useEffect(() => {
    if (currentOffer) setOfferId(currentOffer.id);
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
    if (currentOffer)
      setCurrentCoin(
        Currencies[currency?.toUpperCase() as keyof typeof Currencies],
      );
  }, [currentOffer]);

  const nonProfit = payable as NonProfit;

  const cause = target === "non_profit" ? nonProfit?.cause : payable;
  const actualNonProfit = target === "non_profit" ? nonProfit : undefined;

  useEffect(() => {
    isGooglePaySupported().then((result) => {
      setIsGooglePaySupportedState(result);
    });
  }, []);

  return (
    <View style={S.container}>
      <ModalButtonSelector
        title={t("selectValue")}
        key="offerModal"
        current={offer}
        setCurrentIndex={setOffer}
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

      <Text style={S.accordionTitle}>{t("payment")}</Text>
      <RadioAccordion
        current={0}
        items={[
          {
            title: t("paymentMethodSection.creditCard"),
            children: (
              <CreditCardForm
                onSubmit={handlePayment}
                showFiscalFields={currentOffer?.gateway !== "stripe"}
              />
            ),
            rightIcon: <CreditCardIcon />,
          },
          {
            title: t("paymentMethodSection.googlePay"),
            children: (
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
            children: (
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
