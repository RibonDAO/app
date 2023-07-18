import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePayable from "hooks/usePayable";
import S from "./styles";

export default function CryptoSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutScreen",
  });

  const { target, targetId } = useCheckoutContext();

  const payable = usePayable(target, targetId);

  return (
    <View>
      <Text style={S.title}>
        {t("donatingTo")}
        <Text style={S.payableName}>{payable?.name}</Text>
      </Text>
      <Text>not available yet</Text>
    </View>
  );
}
