import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { maskForTaxId } from "@ribon.io/shared/lib";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { logEvent } from "services/analytics";
import { countryList } from "utils/countryList";
import getThemeByFlow from "lib/themeByFlow";
import InputText from "components/atomics/inputs/InputText";
import { View } from "components/Themed";
import S from "screens/promoters/PaymentScreen/UserInfoSection/styles";

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

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const colorTheme = getThemeByFlow(flow);
  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const handleChangeMask = (value: string) => {
    setTaxId(maskForTaxId(value, brazilFormatForTaxId));
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setBrazilFormatForTaxId(isBrazil(value));
  };

  useEffect(() => {
    setButtonDisabled(!(state && city && taxId.length === maxTaxIdLength()));
  }, [state, city, taxId]);

  useEffect(() => {
    logEvent("treasureSupportBillingInfo_view");
  });

  const inputStyles = {
    borderColor: colorTheme.shade40,
    color: colorTheme.shade20,
  };

  return (
    <View style={S.container}>
      {/* <S.CountryInput */}
      {/*  name="country" */}
      {/*  suggestions={countryList(currentLang)} */}
      {/*  placeholder={t("country")} */}
      {/*  onOptionChanged={handleCountryChange} */}
      {/*  required */}
      {/* /> */}
      <View style={S.halfInputContainer}>
        <InputText
          style={inputStyles}
          name={city}
          placeholder={t("city")}
          value={city}
          onChangeText={(value) => setCity(value)}
        />
        <InputText
          style={inputStyles}
          name={state}
          placeholder={t("state")}
          value={state}
          onChangeText={(value) => setState(value)}
        />
      </View>
      <InputText
        style={inputStyles}
        name={taxId}
        placeholder={t("taxId")}
        value={taxId}
        onChangeText={handleChangeMask}
        maxLength={maxTaxIdLength()}
      />
    </View>
  );
}

export default UserInfoSection;
