import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import InputText from "components/atomics/inputs/InputText";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
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
import { logEvent } from "services/analytics";
import { usePixPaymentInformation } from "contexts/pixInformationContext";
import { NonProfit, Offer } from "@ribon.io/shared";
import { useCheckoutContext } from "contexts/checkoutContext";
import S from "./styles";

export type Props = {
  offer: Offer;
  nonProfit?: NonProfit;
  eventParams?: Record<any, any>;
};

function PixSection({ offer, nonProfit, eventParams }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  const { t: field } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen.paymentMethodSection.creditCardFields",
  });

  const { handleSubmit } = usePixPaymentInformation();

  const {
    name,
    setName,
    country,
    setCountry,
    taxId,
    setTaxId,
    email,
    setEmail,
    setOffer,
    setNonProfit,
  } = useCheckoutContext();

  const [maskedTaxId, setMaskedTaxId] = useState("999.999.999-99");

  useEffect(() => {
    logEvent("selectPix_click", {
      eventParams,
    });
  }, []);

  function isBrazil(countryName: string) {
    return countryName === t("brazilName");
  }

  const [brazilFormatForTaxId, setBrazilFormatForTaxId] = useState(true);

  const maxTaxIdLength = () => (brazilFormatForTaxId ? 14 : 11);

  const { currentLang } = useLanguage();

  const [currentCountryCode, setCurrentCountryCode] = useState(
    countryCodeByLanguage(Languages.PT),
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

  useEffect(() => {
    if (offer) {
      setOffer(offer);
    }
  }, [offer]);

  useEffect(() => {
    if (nonProfit) {
      setNonProfit(nonProfit);
    }
  }, [nonProfit]);

  const { signedIn } = useCurrentUser();

  return (
    <View style={S.container}>
      {!signedIn && (
        <InputText
          name="email"
          label={field("email")}
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={{ display: "flex", flex: 1 }}
          autoCapitalize="none"
        />
      )}

      <>
        <View style={S.labelIcon}>
          <Text style={S.label}>{field("country")}</Text>
        </View>
        <CountryPicker
          translation={currentLang === Languages.PT ? "por" : undefined}
          withEmoji
          preferredCountries={["BR", "US"]}
          withCountryNameButton
          countryCode={currentCountryCode as CountryCode}
          onSelect={handleCountryChange}
          withFilter
          filterProps={{
            placeholder: t("searchCountryPlaceholder") || "",
          }}
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
        <InputText
          name="tax"
          label={field("cpf")}
          mask={maskedTaxId}
          value={taxId}
          onChangeText={(value) => setTaxId(value)}
          maxLength={maxTaxIdLength()}
          keyboardType="numeric"
          style={{ display: "flex", flex: 1 }}
        />
      </>

      <InputText
        name="name"
        label={field("name")}
        value={name}
        onChangeText={(value) => setName(value)}
        style={{ display: "flex", flex: 1 }}
      />

      <Button
        text={t("confirmPayment")}
        onPress={() => {
          handleSubmit();
        }}
        customStyles={S.button}
        textColor={theme.colors.neutral10}
        backgroundColor={theme.colors.brand.primary[600]}
        borderColor="transparent"
      />
    </View>
  );
}

export default PixSection;
