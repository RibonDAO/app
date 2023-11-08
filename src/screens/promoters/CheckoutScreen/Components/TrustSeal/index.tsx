import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";

import { Text, View, Image } from "react-native";
import * as S from "./styles";
import StripeIcon from "../../assets/StripeIcon.png";

function TrustSeal(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.pixInstructionsScreen",
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
