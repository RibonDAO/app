import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared";
import { useWarmGlowMessages } from "@ribon.io/shared/hooks";
import usePageView from "hooks/usePageView";
import { useAuthentication } from "contexts/authenticationContext";
import LottieAnimation from "components/atomics/LottieAnimation";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { DONATION_COUNT } from "lib/localStorage/constants";
import { useState } from "react";
import postDonationAnimation from "./assets/postDonationAnimation.json";
import sunAnimation from "./assets/sunAnimation.json";
import * as S from "./styles";

function generateFaceColorFilter(
  eyebrownsColor: string,
  faceColor: string,
  eyesAndMouthColor: string,
) {
  return [
    {
      keypath: "olhos",
      color: eyesAndMouthColor,
    },
    {
      keypath: "boca",
      color: eyesAndMouthColor,
    },
    {
      keypath: "sobran1",
      color: eyebrownsColor,
    },
    {
      keypath: "sobran2",
      color: eyebrownsColor,
    },
    {
      keypath: "rosto1",
      color: faceColor,
    },
    {
      keypath: "rosto2",
      color: faceColor,
    },
    {
      keypath: "rosto3",
      color: faceColor,
    },
    {
      keypath: "rosto4",
      color: faceColor,
    },
    {
      keypath: "rosto5",
      color: faceColor,
    },
    {
      keypath: "rosto6",
      color: faceColor,
    },
  ];
}

function generateSunColorFilter(sunColor: string) {
  return [
    {
      keypath: "sparkVector Outlines",
      color: sunColor,
    },
  ];
}

function generateRandomColorArgs() {
  const options = [
    {
      eyesAndMouth: theme.colors.brand.primary[500],
      face: theme.colors.brand.primary[50],
      eyeBrowns: theme.colors.brand.primary[300],
      sun: theme.colors.brand.primary[25],
      button: theme.colors.brand.primary[600],
    }, // green
    {
      eyesAndMouth: theme.colors.brand.quaternary[500],
      face: theme.colors.brand.quaternary[300],
      eyeBrowns: theme.colors.brand.quaternary[300],
      sun: theme.colors.brand.quaternary[25],
      button: theme.colors.brand.quaternary[600],
    }, // yellow
    {
      eyesAndMouth: theme.colors.brand.tertiary[500],
      face: theme.colors.brand.tertiary[300],
      eyeBrowns: theme.colors.brand.tertiary[300],
      sun: theme.colors.brand.tertiary[25],
      button: theme.colors.brand.tertiary[600],
    }, // pink
    {
      eyesAndMouth: theme.colors.brand.secondary[500],
      face: theme.colors.brand.secondary[100],
      eyeBrowns: theme.colors.brand.secondary[300],
      sun: theme.colors.brand.secondary[25],
      button: theme.colors.brand.secondary[600],
    }, // orange
    {
      eyesAndMouth: "#5396C9",
      face: "#7BC6FF",
      eyeBrowns: "#7BC6FF",
      sun: "#F6FBFE",
      button: "#3E7AA8",
    },
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  const args = options[randomIndex];

  return {
    button: args.button,
    sun: generateSunColorFilter(args.sun),
    face: generateFaceColorFilter(args.eyeBrowns, args.face, args.eyesAndMouth),
  };
}

function PostDonationScreen() {
  usePageView("P39_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen",
  });
  const { isAuthenticated } = useAuthentication();
  const { navigateTo } = useNavigation();
  const { warmGlowMessage, isLoading } = useWarmGlowMessages();
  const [colorArgs] = useState(generateRandomColorArgs());

  const shouldAskForReview = async () => {
    const donations = await getLocalStorageItem(DONATION_COUNT);
    let donationCount = donations ? parseInt(donations, 10) : 0;
    donationCount += 1;

    await setLocalStorageItem(DONATION_COUNT, donationCount.toString());
    if (donationCount === 2) {
      return true;
    } else {
      return false;
    }
  };

  const handleNavigate = async () => {
    const donations = await getLocalStorageItem(DONATION_COUNT);
    const donationCount = donations ? parseInt(donations, 10) : 0;

    if (!isAuthenticated() && donationCount > 1) {
      navigateTo("ValidateAccountScreen");
    } else {
      navigateTo("TabNavigator", {
        screen: "CausesScreen",
        params: {
          shouldAskForReview: await shouldAskForReview(),
        },
      });
    }
  };

  return isLoading ? null : (
    <>
      <S.Container>
        <S.TopContainer>
          <LottieAnimation
            animationData={postDonationAnimation}
            width={428}
            height={428}
            colorFilters={colorArgs.face}
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
            backgroundColor: colorArgs.button,
            borderColor: colorArgs.button,
            borderRadius: 12,
          }}
        />
      </S.Container>
      <S.BackgroundSun>
        <LottieAnimation
          animationData={sunAnimation}
          width="100%"
          height={262}
          colorFilters={colorArgs.sun}
        />
      </S.BackgroundSun>
    </>
  );
}

export default PostDonationScreen;
