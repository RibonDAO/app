import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { logEvent } from "services/analytics";
import S from "./styles";
import { ImageBackground, Linking, Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import cardBackground from "./assets/cardBackground.png";
import { theme } from "@ribon.io/shared";

function UserSupportSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.userSupportSection",
  });

  const handleClick = () => {
    logEvent("UserSupportBtn_Click");
    Linking.openURL(
      "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=ribonapp.zendesk.com",
    );
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
