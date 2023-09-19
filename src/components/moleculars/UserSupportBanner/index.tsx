import { useTranslation } from "react-i18next";

import { logEvent } from "services/analytics";
import React from "react";
import { openInWebViewer } from "lib/linkOpener";
import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import RibonSunLeft from "assets/images/ribon-sun-left.png";
import Banner from "../Banner";

type Props = {
  from: string;
};
function UserSupportBanner({ from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "userSupportBanner",
  });

  const handleClick = () => {
    logEvent("supportBtn_click", {
      from,
    });
    openInWebViewer(t("link"));
  };

  return (
    <View style={{ marginTop: theme.spacingNative(16) }}>
      <Banner
        onArrowClick={handleClick}
        title={{
          text: t("title"),
          size: "medium",
          color: theme.colors.neutral[900],
        }}
        text={t("text") ?? ""}
        icon={{
          type: "rounded",
          name: "support_agent",
          color: theme.colors.neutral[900],
          size: 24,
        }}
        withCircle
        cardBackground={RibonSunLeft}
        textColor={theme.colors.neutral[900]}
        backgroundColor={theme.colors.brand.secondary[100]}
        arrowLinkColor={theme.colors.brand.secondary[900]}
      />
    </View>
  );
}

export default UserSupportBanner;
