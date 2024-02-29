import { View, Text } from "react-native";
import { useCheckoutContext } from "contexts/checkoutContext";
import { useTranslation } from "react-i18next";
import S from "./styles";

export default function PriceSection() {
  const { offer } = useCheckoutContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.club.checkoutScreen",
  });
  return (
    <View style={S.container}>
      <View style={S.titleContainer}>
        <Text style={S.title}>{t("title")}</Text>
        <Text style={S.receiver}>{t("receiver")}</Text>
      </View>
      <View style={S.offer}>
        <Text style={S.offerPrice}>{offer?.price}</Text>
      </View>
    </View>
  );
}
