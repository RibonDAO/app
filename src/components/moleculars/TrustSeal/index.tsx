import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { Text, View, Image } from "react-native";
import StripeIcon from "assets/images/StripeIcon.png";
import * as S from "./styles";

function TrustSeal(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters",
  });

  return (
    <View style={S.default.container}>
      <Icon
        name="verified_user"
        size={25}
        color={theme.colors.brand.primary[600]}
        type="rounded"
      />
      <Text style={S.default.text}>{t("sealText")}</Text>
      <Image source={StripeIcon} accessibilityIgnoresInvertColors />
    </View>
  );
}

export default TrustSeal;
