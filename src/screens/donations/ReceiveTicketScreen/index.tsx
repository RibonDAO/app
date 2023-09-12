import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import SupportersIcon from "components/vectors/SupportersIcon";
import UserIcon from "components/vectors/UserIcon";
import { useNavigation } from "hooks/useNavigation";
import { View, Text, ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import topBackground from "./assets/topBackground.png";
import S from "./styles";

function ReceiveTicketScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketScreen",
  });

  const { navigateTo } = useNavigation();

  return (
    <View style={S.container}>
      <ImageBackground source={topBackground} style={S.topBackground}>
        <View style={S.animationContainer}>
          <TransferTicketAnimation
            onAnimationEnd={() => {
              setTimeout(() => {
                navigateTo("GiveTicketScreen");
              }, 500);
            }}
            senderIcon={<SupportersIcon />}
            receiverIcon={<UserIcon />}
            senderText={t("textOrigin")}
            receiverText={t("textDestiny")}
          />
        </View>
        <Text style={S.description}>{t("description")}</Text>
      </ImageBackground>
    </View>
  );
}

export default ReceiveTicketScreen;
