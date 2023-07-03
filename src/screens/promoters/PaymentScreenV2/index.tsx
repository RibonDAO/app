import { Platform, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useOffers } from "@ribon.io/shared/hooks";
import { Currencies } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import { useRouteParams } from "hooks/useRouteParams";
import { useCallback, useEffect, useState } from "react";
import RadioAccordion from "components/moleculars/accordions/RadioAccordion";
import usePayable from "hooks/usePayable";
import Button from "components/atomics/buttons/Button";
import OfferSelection from "./OfferSelection";
import CreditCardForm from "./CreditCardForm";
import ModalButtonSelector from "./ModalButtonSelector";
import CreditCardIcon from "./assets/CreditCardIcon";
import GooglePayIcon from "./assets/GooglePayIcon";
import ApplePayIcon from "./assets/ApplePayIcon";
import S from "./styles";

function PaymentScreenV2(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.paymentPageV2",
  });

  const { params } = useRouteParams<"PaymentScreenV2">();
  const { target, targetId, offer, currency } = params;
  const [creditCard, setCreditCard] = useState({
    name: "",
    number: "",
    expirationDate: "",
    cvv: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [offersModalVisible, setOffersModalVisible] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(Number(offer));
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(() => {
    const currencies = Object.values(Currencies);
    return currencies.indexOf(currency as Currencies);
  });

  const currentCurrency = useCallback(() => {
    const currencies = Object.values(Currencies);
    return currencies[currentCurrencyIndex];
  }, [currentCurrencyIndex]);

  const {
    offers,
    refetch: refetchOffers,
    isLoading: isLoadingOffers,
  } = useOffers(
    Currencies[currentCurrency() as keyof typeof Currencies],
    false,
  );

  const buttonCurrencyItems = Object.values(Currencies).map((currencyItem) => ({
    label: currencyItem,
  }));

  const buttonOfferItems = offers?.map((offerItem) => ({
    label: offerItem.price,
  }));

  useEffect(() => {
    if (!isLoadingOffers) {
      setCurrentOfferIndex(0);
    }
  }, [isLoadingOffers]);

  useEffect(() => {
    if (loaded) setCurrentOfferIndex(0);

    refetchOffers();
  }, [currentCurrencyIndex]);

  useEffect(() => {
    const isFirstTimeFetching =
      offer && offers.length > 0 && !isLoadingOffers && !loaded;

    if (isFirstTimeFetching) {
      const index = Number(offer) > offers.length - 1 ? 0 : Number(offer);

      setCurrentOfferIndex(index);
      setLoaded(true);
    }
  }, [offers]);

  const payable = usePayable(target, targetId);

  return (
    <KeyboardAvoidingView
      style={S.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ModalButtonSelector
        title={t("selectValue")}
        key="offerModal"
        current={currentOfferIndex}
        setCurrentIndex={setCurrentOfferIndex}
        items={buttonOfferItems}
        visible={offersModalVisible}
        setVisible={setOffersModalVisible}
      />
      <ModalButtonSelector
        title={t("selectCurrency")}
        key="currencyModal"
        current={currentCurrencyIndex}
        setCurrentIndex={setCurrentCurrencyIndex}
        items={buttonCurrencyItems}
        visible={currencyModalVisible}
        setVisible={setCurrencyModalVisible}
      />
      {payable && (
        <View>
          <Text style={S.title}>
            {t("donatingTo")}
            <Text style={S.payableName}>{payable.name}</Text>
          </Text>
        </View>
      )}
      <View>
        {!isLoadingOffers && (
          <OfferSelection
            currentOffer={offers[currentOfferIndex]}
            handleOfferChange={() => setOffersModalVisible(true)}
            handleCurrencyChange={() => setCurrencyModalVisible(true)}
          />
        )}
      </View>
      <RadioAccordion
        current={0}
        items={[
          {
            title: t("paymentMethodSection.creditCard"),
            children: (
              <CreditCardForm data={creditCard} setData={setCreditCard} />
            ),
            rightIcon: <CreditCardIcon />,
          },
          {
            title: t("paymentMethodSection.googlePay"),
            onClick: () => {},
            rightIcon: <GooglePayIcon />,
          },
          {
            title: t("paymentMethodSection.applePay"),
            onClick: () => {},
            rightIcon: <ApplePayIcon />,
          },
        ]}
      />

      <Button
        text={t("confirmPayment")}
        onPress={() => {}}
        timeout={2000}
        timeoutCallback={() => {}}
        disabled={false}
        customStyles={S.button}
        textColor={theme.colors.neutral10}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor="transparent"
      />
    </KeyboardAvoidingView>
  );
}
export default PaymentScreenV2;
