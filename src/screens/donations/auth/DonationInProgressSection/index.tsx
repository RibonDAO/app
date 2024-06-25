import { NonProfit } from "@ribon.io/shared/types";
import { useUserProfile } from "@ribon.io/shared/hooks";
import ImageWithIconOverlay from "components/moleculars/ImageWithIconOverlay";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import LottieAnimation from "components/atomics/LottieAnimation";
import donationAnimation from "./assets/donationAnimation.json";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
  shouldRepeatAnimation: boolean;
};
function DonationInProgressSection({
  nonProfit,
  onAnimationEnd,
  shouldRepeatAnimation,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationInProgress",
  });
  const { userProfile } = useUserProfile();
  const navigation = useNavigation();
  const { profile } = userProfile();
  const [goToNextScreen, setGoToNextScreen] = useState(false);
  const getRandomFrame = () => {
    // frame 20 -> garrafa
    // frame 63 -> seringa
    // frame 110 -> medicamento
    // frame 136 -> pintinho
    // frame 239 -> final
    const frames = [20, 63, 110, 136];
    return frames[Math.floor(Math.random() * frames.length)];
  };
  const endFrame = 239;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    return () => {
      navigation.setOptions({ headerShown: true });
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGoToNextScreen(true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (!shouldRepeatAnimation && goToNextScreen) {
      onAnimationEnd();
    }
  }, [shouldRepeatAnimation, goToNextScreen]);

  return (
    <S.Container>
      <S.AnimationContainer>
        <LottieAnimation
          animationData={donationAnimation}
          width={360}
          height={360}
          startFrame={getRandomFrame()}
          endFrame={endFrame}
        />
      </S.AnimationContainer>
      <S.BottomContainer>
        <ImageWithIconOverlay
          leftImage={profile?.photo}
          rightImage={nonProfit?.icon}
        />
        <S.LoadingContainer>
          <S.LoadingText>{t("loadingText")}</S.LoadingText>
        </S.LoadingContainer>
      </S.BottomContainer>
    </S.Container>
  );
}

export default DonationInProgressSection;
