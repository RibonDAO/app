import { useTranslation } from "react-i18next";

import { logEvent } from "services/analytics";
import { openInWebViewer } from "lib/linkOpener";
import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import { EXPO_PUBLIC_ZENDESK_KEY } from "utils/constants/Application";
import RibonSunLeft from "assets/images/ribon-sun-left.png";
import Banner from "../Banner";

type Props = {
  from: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
};
function UserSupportBanner({
  from,
  title,
  description,
  backgroundColor,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "userSupportBanner",
  });
  const key = EXPO_PUBLIC_ZENDESK_KEY;

  const handleClick = () => {
    logEvent("supportBtn_click", {
      from,
    });
    openInWebViewer(t("link", { key }));
  };

  return (
    <View style={{ marginTop: theme.spacingNative(16) }}>
      <Banner
        onArrowClick={handleClick}
        title={{
          text: title ?? t("title"),
          size: "medium",
          color: theme.colors.neutral[900],
        }}
        text={description ?? t("text") ?? ""}
        icon={{
          type: "rounded",
          name: "support_agent",
          color: theme.colors.neutral[900],
          size: 24,
        }}
        withCircle
        cardBackground={RibonSunLeft}
        textColor={theme.colors.neutral[900]}
        backgroundColor={backgroundColor ?? theme.colors.brand.secondary[100]}
        arrowLinkColor={theme.colors.brand.secondary[900]}
      />
    </View>
  );
}

export default UserSupportBanner;
