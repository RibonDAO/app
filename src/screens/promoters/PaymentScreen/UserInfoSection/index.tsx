import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "contexts/languageContext";
import { maskForTaxId } from "@ribon.io/shared/lib";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import getThemeByFlow from "lib/themeByFlow";
import InputText from "components/atomics/inputs/InputText";
import { View } from "react-native";
import S from "screens/promoters/PaymentScreen/UserInfoSection/styles";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import {
  countryByLanguage,
  countryCodeByLanguage,
} from "lib/countryByLanguage";
import { Languages } from "types/enums/Languages";
import {
  BRstates,
  USAstates,
} from "screens/promoters/PaymentScreen/UserInfoSection/federationStates";
import { theme } from "@ribon.io/shared/styles";

function UserInfoSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportCauseScreen.paymentScreen.billingInformationSection",
  });
  const { currentLang } = useLanguage();
  const {
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    taxId,
    setTaxId,
    setButtonDisabled,
    flow,
  } = useCardPaymentInformation();

  const [currentCountryCode, setCurrentCountryCode] = useState(
    countryCodeByLanguage(currentLang),
  );

  useEffect(() => {
    setCountry(countryByLanguage(currentLang));
  }, []);

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const colorTheme = getThemeByFlow(flow);
  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const handleChangeMask = (value: string) => {
    setTaxId(maskForTaxId(value, brazilFormatForTaxId));
  };

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry.name as string);
    setCurrentCountryCode(selectedCountry.cca2);
    setBrazilFormatForTaxId(isBrazil(selectedCountry.name as string));
  };

  const federationStates = useCallback(() => {
    if (isBrazil(country)) return BRstates;

    return USAstates;
  }, [country]);

  useEffect(() => {
    setButtonDisabled(!(state && city && taxId.length === maxTaxIdLength()));
  }, [state, city, taxId]);

  const inputStyles = {
    borderColor: colorTheme.shade40,
    color: colorTheme.shade20,
  };

  return (
    <View style={S.container}>
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
          { borderColor: colorTheme.shade40 },
        ]}
        theme={{
          ...S.countryInputTheme,
          primaryColor: colorTheme.shade20,
          primaryColorVariant: colorTheme.shade20,
          filterPlaceholderTextColor: colorTheme.shade20,
          onBackgroundTextColor: colorTheme.shade40,
        }}
      />
      <View style={S.halfInputContainer}>
        <InputText
          style={inputStyles}
          name={city}
          placeholder={t("city")}
          value={city}
          onChangeText={(value) => setCity(value)}
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
          autoFocus
        />
        <InputText
          style={inputStyles}
          name={state}
          placeholder={t("state")}
          value={state}
          onChangeText={(value) => setState(value)}
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
        />
      </View>
      <InputText
        style={inputStyles}
        name={taxId}
        placeholder={t("taxId")}
        value={taxId}
        onChangeText={handleChangeMask}
        maxLength={maxTaxIdLength()}
        keyboardType="numeric"
      />
    </View>
  );
}

export default UserInfoSection;
