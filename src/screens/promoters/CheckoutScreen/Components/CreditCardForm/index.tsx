import { useEffect, useState } from "react";
import { View } from "react-native";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { theme } from "@ribon.io/shared/styles";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "types/enums/Languages";
import { maskForTaxId } from "@ribon.io/shared/lib";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  countryByLanguage,
  countryCodeByLanguage,
} from "lib/countryByLanguage";
import S from "./styles";

export type Props = {
  onSubmit: () => void;
  showFiscalFields: boolean;
};

function CreditCardForm({ onSubmit, showFiscalFields }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen.paymentMethodSection.creditCardFields",
  });

  const {
    number,
    name,
    expirationDate,
    cvv,
    setNumber,
    setName,
    setExpirationDate,
    setCvv,
    buttonDisabled,
    setButtonDisabled,
    country,
    setCountry,
    city,
    setCity,
    state,
    setState,
    taxId,
    setTaxId,
    email,
    setEmail,
  } = useCardPaymentInformation();
  const [maskedTaxId, setMaskedTaxId] = useState("999.999.999-99");

  useEffect(() => {
    setButtonDisabled(
      !(number && name && !expirationDate.includes("_") && cvv.length >= 3),
    );
  }, [number, name, expirationDate, cvv]);

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const { currentLang } = useLanguage();

  const [currentCountryCode, setCurrentCountryCode] = useState(
    countryCodeByLanguage(currentLang),
  );

  useEffect(() => {
    if (country && currentLang) {
      setMaskedTaxId(maskForTaxId(country, currentLang));
    }
  }, [country, currentLang]);

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry.name as string);
    setTaxId("");
    setCurrentCountryCode(selectedCountry.cca2);
    setBrazilFormatForTaxId(isBrazil(selectedCountry.name as string));
  };

  useEffect(() => {
    if (!country) {
      setCountry(countryByLanguage(currentLang));
      setBrazilFormatForTaxId(isBrazil(countryByLanguage(currentLang)));
    }
  }, [currentLang, country]);

  const { signedIn } = useCurrentUser();

  return (
    <View style={S.container}>
      {!signedIn && (
        <InputText
          name="email"
          placeholder={field("email")}
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={{ display: "flex", flex: 1 }}
          testID="name"
          autoCapitalize="none"
        />
      )}
      {showFiscalFields && (
        <>
          <CountryPicker
            translation={currentLang === Languages.PT ? "por" : undefined}
            withEmoji
            preferredCountries={["BR", "US"]}
            withCountryNameButton
            countryCode={currentCountryCode as CountryCode}
            onSelect={handleCountryChange}
            withFilter
            filterProps={{ placeholder: t("searchCountryPlaceholder") || "" }}
            containerButtonStyle={[
              S.countryInputContainer,
              { borderColor: theme.colors.neutral[400] },
            ]}
            theme={{
              ...S.countryInputTheme,
              filterPlaceholderTextColor: theme.colors.neutral[900],
              onBackgroundTextColor: theme.colors.neutral[900],
            }}
          />
          <View style={S.half}>
            <InputText
              name={city}
              placeholder={field("city")}
              value={city}
              onChangeText={(value) => setCity(value)}
              containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
              style={{ display: "flex", flex: 1 }}
            />
            <InputText
              name={state}
              placeholder={field("state")}
              value={state}
              onChangeText={(value) => setState(value)}
              containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
              style={{ display: "flex", flex: 1 }}
            />
          </View>
          <InputText
            name={taxId}
            placeholder={field("taxId")}
            mask={maskedTaxId}
            value={taxId}
            onChangeText={(value) => setTaxId(value)}
            maxLength={maxTaxIdLength()}
            keyboardType="numeric"
            style={{ display: "flex", flex: 1 }}
          />
        </>
      )}
      <InputText
        name="number"
        placeholder={field("number")}
        mask="9999 9999 9999 9999"
        value={number}
        onChangeText={(value) => setNumber(value)}
        maxLength={19}
        keyboardType="numeric"
        style={{ display: "flex", flex: 1 }}
        testID="number"
      />
      <InputText
        name="name"
        placeholder={field("name")}
        value={name}
        onChangeText={(value) => setName(value)}
        style={{ display: "flex", flex: 1 }}
        testID="name"
      />
      <View style={S.half}>
        <InputText
          name="expirationDate"
          value={expirationDate}
          placeholder={field("expirationDate")}
          mask="99/9999"
          autoComplete="cc-exp"
          onChangeText={(value) => setExpirationDate(value)}
          maxLength={7}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
          containerStyle={{ width: "48%" }}
          testID="expirationDate"
        />
        <InputText
          name="cvv"
          placeholder={field("cvv")}
          maxLength={4}
          value={cvv}
          onChangeText={(value) => setCvv(value)}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
          containerStyle={{ width: "48%" }}
          testID="cvv"
        />
      </View>

      <Button
        text={t("confirmPayment")}
        onPress={() => {
          setButtonDisabled(true);
          onSubmit();
        }}
        disabled={buttonDisabled}
        customStyles={S.button}
        textColor={theme.colors.neutral10}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor="transparent"
      />
    </View>
  );
}

export default CreditCardForm;
