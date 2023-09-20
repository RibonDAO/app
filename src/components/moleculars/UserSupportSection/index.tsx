import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { logEvent } from "services/analytics";
import { ImageBackground, Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { openInWebViewer } from "lib/linkOpener";
import { REACT_APP_ZENDESK_KEY } from "utils/constants/Application";
import { theme } from "@ribon.io/shared";
import { useCurrentUser } from "contexts/currentUserContext";
import S from "./styles";
import cardBackground from "./assets/cardBackground.png";

type Props = {
  source?: string;
};

function UserSupportSection({ source }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.userSupportSection",
  });
  const { currentUser } = useCurrentUser();

  const key = REACT_APP_ZENDESK_KEY;

  const handleClick = (src?: string) => {
    logEvent("supportBtn_click", { from: src, email: currentUser?.email });
    openInWebViewer(t("link", { key }));
  };

  return (
    <View style={S.container}>
      <ImageBackground source={cardBackground} style={S.imageBackground}>
        <View style={S.iconText}>
          <View style={S.iconContainer}>
            <Icon
              type="rounded"
              name="live_help"
              size={20}
              color={theme.colors.brand.secondary[700]}
            />
          </View>
          <Text style={S.title}>{t("title")}</Text>
        </View>

        <Text style={S.description}>{t("description")}</Text>
        <Button
          textColor={theme.colors.brand.secondary[700]}
          customStyles={S.supportButton}
          text={t("primaryButtonText")}
          onPress={() => handleClick(source)}
        />
      </ImageBackground>
    </View>
  );
}

export default UserSupportSection;
