import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared";
import { useWarmGlowMessages } from "@ribon.io/shared/hooks";
import usePageView from "hooks/usePageView";
import { useAuthentication } from "contexts/authenticationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import LottieAnimation from "components/atomics/LottieAnimation";
import GreenSun from "assets/illustrations/GreenSun";
import postDonationAnimation from "./assets/postDonationAnimation.json";
import * as S from "./styles";

function PostDonationScreen() {
  usePageView("P39_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen",
  });
  const { isAuthenticated } = useAuthentication();
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { warmGlowMessage, isLoading } = useWarmGlowMessages();

  const handleNavigate = () => {
    if (!isAuthenticated()) {
      navigateTo("SentMagicLinkEmailScreen", { email: currentUser?.email });
    } else {
      navigateTo("TabNavigator", { screen: "CausesScreen" });
    }
  };

  return isLoading ? null : (
    <S.Container>
      <S.TopContainer>
        <LottieAnimation
          animationData={postDonationAnimation}
          width={360}
          height={360}
        />
      </S.TopContainer>
      <S.ContentContainer>
        <S.Title>{t("title")}</S.Title>
        <S.Description>{warmGlowMessage?.message}</S.Description>
      </S.ContentContainer>

      <Button
        onPress={handleNavigate}
        text={t("buttonText")}
        customTextStyles={{
          color: theme.colors.neutral10,
        }}
        customStyles={{
          backgroundColor: theme.colors.brand.primary[600],
          borderColor: theme.colors.brand.primary[800],
          borderRadius: 12,
        }}
      />
      <S.BackgroundSun>
        <GreenSun />
      </S.BackgroundSun>
    </S.Container>
  );
}

export default PostDonationScreen;
