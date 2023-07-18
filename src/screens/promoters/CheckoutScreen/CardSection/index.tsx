import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import RadioAccordion from "components/moleculars/RadioAccordion";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies, Offer, NonProfit, Cause } from "@ribon.io/shared/types";
import { useEffect, useState } from "react";
import { useApplePay, useGooglePay } from "@stripe/stripe-react-native";
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

  const { isApplePaySupported } = useApplePay();
  const { isGooglePaySupported } = useGooglePay();

  const { target, targetId, currency, offer, setOffer } = useCheckoutContext();
  const {
    buttonDisabled,
    handleSubmit,
    setOfferId,
    setCurrentCoin,
    setCause,
    setNonProfit,
  } = useCardPaymentInformation();
  const payable = usePayable(target, targetId);

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(Currencies[currency as keyof typeof Currencies], false);

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
    if (!currentOffer) return;

    setOfferId(currentOffer?.id);
    setCurrentCoin(Currencies[currency as keyof typeof Currencies]);

    if (target === "cause") setCause(payable as Cause);
    if (target === "nonProfit") setNonProfit(payable as NonProfit);

    handleSubmit();
  };

  const nonProfit = payable as NonProfit;

  const cause = target === "non_profit" ? nonProfit?.cause : payable;
  const actualNonProfit = target === "non_profit" ? nonProfit : undefined;

  useEffect(() => {
    isGooglePaySupported().then((result) => {
      setIsGooglePaySupportedState(result);
    });
  }, []);

  return (
    <View>
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
            children: <CreditCardForm />,
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
            show: isApplePaySupported,
          },
        ]}
      />

      <Button
        text={t("confirmPayment")}
        onPress={() => {}}
        timeout={2000}
        timeoutCallback={handlePayment}
        disabled={buttonDisabled}
        customStyles={S.button}
        textColor={theme.colors.neutral10}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor="transparent"
      />
    </View>
  );
}
