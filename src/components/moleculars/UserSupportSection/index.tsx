import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { logEvent } from "services/analytics";
import { ImageBackground, Linking, Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { openInWebViewer } from "lib/linkOpener";
import { theme } from "@ribon.io/shared";
import S from "./styles";
import cardBackground from "./assets/cardBackground.png";

function UserSupportSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.userSupportSection",
  });

  const handleClick = () => {
    logEvent("UserSupportBtn_Click");
    openInWebViewer(t("link"));
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
          onPress={handleClick}
        />
      </ImageBackground>
    </View>
  );
}

export default UserSupportSection;
