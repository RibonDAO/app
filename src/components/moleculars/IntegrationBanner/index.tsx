import { useTranslation } from "react-i18next";

import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import { Integration } from "@ribon.io/shared";
import BannerInfo from "../BannerInfo";

type Props = {
  integration: Integration;
};

function IntegrationBanner({ integration }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrationBanner",
  });
  const integrationName = integration?.name;

  return (
    <View style={{ marginTop: theme.spacingNative(16) }}>
      <BannerInfo
        title={{
          text: t("title", { integrationName }),
          size: "medium",
          color: theme.colors.brand.primary[900],
          stylized: false,
        }}
        squareImage={integration?.logo}
        text={t("text", { integrationName }) ?? ""}
        textColor={theme.colors.neutral[900]}
        backgroundColor={theme.colors.brand.primary[50]}
      />
    </View>
  );
}

export default IntegrationBanner;
