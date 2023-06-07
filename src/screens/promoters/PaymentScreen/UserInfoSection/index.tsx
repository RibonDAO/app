import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "contexts/languageContext";
import { maskForTaxId } from "@ribon.io/shared/lib";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
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
  } = useCardPaymentInformation();

  const [currentCountryCode, setCurrentCountryCode] = useState(
    countryCodeByLanguage(currentLang),
  );

  const currentContry = countryByLanguage(currentLang);
  setCountry(currentContry);

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const handleCountryChange = (selectedCountry: Country) => {
    setCountry(selectedCountry.name as string);
    setCurrentCountryCode(selectedCountry.cca2);
    setBrazilFormatForTaxId(isBrazil(selectedCountry.name as string));
  };

  useEffect(() => {
    setButtonDisabled(!(state && city && taxId.length === maxTaxIdLength()));
  }, [state, city, taxId]);

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
          { borderColor: theme.colors.neutral[400] },
        ]}
        theme={{
          ...S.countryInputTheme,
          filterPlaceholderTextColor: theme.colors.neutral[900],
          onBackgroundTextColor: theme.colors.neutral[900],
        }}
      />
      <View style={S.halfInputContainer}>
        <InputText
          name={city}
          placeholder={t("city")}
          value={city}
          onChangeText={(value) => setCity(value)}
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
          autoFocus
        />
        <InputText
          name={state}
          placeholder={t("state")}
          value={state}
          onChangeText={(value) => setState(value)}
          containerStyle={{ marginRight: theme.spacingNative(4), flex: 1 }}
        />
      </View>
      <InputText
        name={taxId}
        placeholder={t("taxId")}
        mask={maskForTaxId(country, currentLang)}
        value={taxId}
        onChangeText={(value) => setTaxId(value)}
        maxLength={maxTaxIdLength()}
        keyboardType="numeric"
      />
    </View>
  );
}

export default UserInfoSection;
