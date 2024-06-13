import { NonProfit } from "@ribon.io/shared/types";
import { useUserProfile } from "@ribon.io/shared/hooks";
import ImageWithIconOverlay from "components/moleculars/ImageWithIconOverlay";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import GreenSun from "./assets/GreenSun";
import * as S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
  shouldRepeatAnimation?: boolean;
};
function DonationInProgressSection({
  nonProfit,
  onAnimationEnd,
  shouldRepeatAnimation = true,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationInProgress",
  });
  const { userProfile } = useUserProfile();
  const navigation = useNavigation();
  const { profile } = userProfile();
  const [goToNextScreen, setGoToNextScreen] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    return () => {
      navigation.setOptions({ headerShown: true });
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGoToNextScreen(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!shouldRepeatAnimation && goToNextScreen) {
      onAnimationEnd();
    }
  }, [shouldRepeatAnimation, goToNextScreen]);
  return (
    <S.Container>
      <GreenSun />
      <ImageWithIconOverlay
        leftImage={profile?.photo}
        rightImage={nonProfit?.icon}
      />
      <S.LoadingContainer>
        <S.LoadingText>{t("loadingText")}</S.LoadingText>
      </S.LoadingContainer>
    </S.Container>
  );
}

export default DonationInProgressSection;
