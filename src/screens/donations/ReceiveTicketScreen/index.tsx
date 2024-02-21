import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import SupportersIcon from "components/vectors/SupportersIcon";
import UserIcon from "components/vectors/UserIcon";
import { useNavigation } from "hooks/useNavigation";
import { View, Text, ImageBackground, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useTickets, useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useAuthentication } from "contexts/authenticationContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { PLATFORM } from "utils/constants/Application";
import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";
import { RIBON_COMPANY_ID, setLocalStorageItem } from "@ribon.io/shared";
import { useState } from "react";
import S from "./styles";
import topBackground from "./assets/topBackground.png";

function ReceiveTicketScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketScreen",
  });

  const { navigateTo } = useNavigation();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();

  const { currentUser } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
  const { currentIntegrationId } = useIntegrationContext();
  const { collectByIntegration } = useTickets();
  const [shouldRepeatAnimation, setShouldRepeatAnimation] = useState(true);

  const navigate = () => {
    setTimeout(() => {
      if (isAuthenticated()) {
        collectByIntegration(
          currentIntegrationId ?? "",
          currentUser?.email ?? "",
          PLATFORM,
        );
      }
      setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
      setLocalStorageItem(
        DONATION_TOAST_INTEGRATION,
        (currentIntegrationId ?? RIBON_COMPANY_ID).toString(),
      );
      navigateTo("CausesScreen");
    }, 3000);
    setShouldRepeatAnimation(false);
  };

  return (
    <View style={S.container}>
      <ImageBackground source={topBackground} style={S.topBackground}>
        <View style={S.animationContainer}>
          <TransferTicketAnimation
            shouldRepeat={shouldRepeatAnimation}
            onAnimationEnd={() => {
              navigate();
            }}
            senderIcon={<SupportersIcon />}
            receiverIcon={
              profile?.photo ? (
                <Image
                  source={{ uri: profile?.photo }}
                  accessibilityIgnoresInvertColors
                />
              ) : (
                <UserIcon />
              )
            }
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
