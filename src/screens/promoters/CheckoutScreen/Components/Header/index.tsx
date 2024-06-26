import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { Currencies } from "@ribon.io/shared/types";
import { useCallback, useState } from "react";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import CurrencyExchangeIcon from "../../assets/CurrencyExchangeIcon";
import ModalButtonSelector from "../ModalButtonSelector";
import S from "./styles";

export default function Header() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  const { currency, setCurrency } = useCheckoutContext();

  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

  const currencyIndex = Object.values(Currencies).indexOf(
    currency?.toUpperCase() as Currencies,
  );

  const { popNavigation } = useNavigation();

  const buttonCurrencyItems = Object.values(Currencies)
    .map((currencyItem) => ({
      label: currencyItem,
    }))
    .filter((currencyItem) => currencyItem.label !== Currencies.USDC);

  const setCurrencyByIndex = useCallback(
    (index: number) => {
      const currentCurrency = Object.values(Currencies)[index];
      setCurrency(currentCurrency);
    },
    [setCurrency],
  );

  return (
    <View style={S.header}>
      <ModalButtonSelector
        title={t("selectCurrency")}
        key="currencyModal"
        current={currencyIndex ?? 0}
        setCurrentIndex={setCurrencyByIndex}
        items={buttonCurrencyItems}
        visible={currencyModalVisible}
        setVisible={setCurrencyModalVisible}
      />

      <TouchableOpacity
        accessibilityRole="button"
        onPress={popNavigation}
        style={S.backButton}
      >
        <Icon
          type="outlined"
          name="arrow_back"
          size={20}
          color={theme.colors.brand.primary[900]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => setCurrencyModalVisible(true)}
        style={S.changeCurrencyButton}
      >
        <CurrencyExchangeIcon />
        <Text style={S.changeCurrencyButtonText}>{t("changeCurrency")}</Text>
      </TouchableOpacity>
    </View>
  );
}
