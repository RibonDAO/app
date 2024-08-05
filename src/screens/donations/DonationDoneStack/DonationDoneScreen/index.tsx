import { useCallback, useEffect, useState } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import {
  theme,
  useStatistics,
  useUserConfig,
  useUserProfile,
} from "@ribon.io/shared";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useSound from "hooks/useSound";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "services/analytics";
import Button from "components/atomics/buttons/Button";
import CheckBox from "components/atomics/inputs/Checkbox";
import ImageWithIconOverlay from "components/moleculars/ImageWithIconOverlay";
import LottieAnimation from "components/atomics/LottieAnimation";
import { useReferralLink } from "hooks/useReferralLink";
import donationDoneSound from "./assets/donation-done.mp3";
import NonProfitImagePlaceholder from "./NonProfitImagePlaceholder";
import sunAnimation from "./assets/sunAnimation.json";
import * as S from "./styles";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit, impact } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { playSound } = useSound();
  const { updateUserConfig, userConfig } = useUserConfig();
  const { refetch: refetchUserConfig, config } = userConfig();
  const [allowedEmailMarketing, setAllowedEmailMarketing] = useState(false);
  const { currentUser } = useCurrentUser();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const { copyLink } = useReferralLink();

  const { userStatistics, refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  const quantityOfDonationsToShowEmailCheckbox = 3;
  const firstDonation = 1;

  const [isImageLoading, setIsImageLoading] = useState(true);

  const shouldShowEmailCheckbox = useCallback(() => {
    if (userStatistics && config) {
      return (
        (Number(userStatistics.totalTickets) <=
          quantityOfDonationsToShowEmailCheckbox ||
          Number(userStatistics.totalTickets) %
            quantityOfDonationsToShowEmailCheckbox ===
            0 ||
          Number(userStatistics.totalTickets) === firstDonation) &&
        !config.allowedEmailMarketing
      );
    }
    return false;
  }, [userStatistics, config]);

  const handleNavigate = async () => {
    if (allowedEmailMarketing && currentUser) {
      logEvent("acceptReceiveEmail_click", {
        from: "confirmedDonation_page",
      });
      await updateUserConfig(currentUser.id, { allowedEmailMarketing });
    }
    navigateTo("PostDonationScreen");
  };

  useEffect(() => {
    refetchStatistics();
    refetchUserConfig();
  }, [currentUser]);

  useEffect(() => {
    playSound(donationDoneSound);
    if (shouldShowEmailCheckbox()) {
      logEvent("acceptReceiveEmail_view", {
        from: "confirmedDonation_page",
      });
    }
  }, []);

  const hasCheckbox = shouldShowEmailCheckbox();

  return (
    <>
      <S.Container>
        <S.TopContainer>
          {isImageLoading && <NonProfitImagePlaceholder />}
          <S.CardImage
            source={{ uri: nonProfit?.confirmationImage }}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          <S.ImageWithIconOverlayContainer>
            <ImageWithIconOverlay
              leftImage={profile?.photo}
              rightImage={nonProfit?.icon}
            />
          </S.ImageWithIconOverlayContainer>

          <Button
            onPress={copyLink}
            text={t("share")}
            leftIcon={{
              name: "share",
              type: "outlined",
              color: "white",
              size: 20,
            }}
            textColor="white"
            backgroundColor="rgba(0,0,0,0.5)"
            customTextStyles={{ fontSize: 12 }}
            borderColor="rgba(0,0,0,0)"
            customStyles={{
              alignSelf: "flex-start",
              width: "auto",
              paddingHorizontal: 8,
              paddingVertical: 4,
              height: "auto",
              borderRadius: 8,
              marginLeft: "auto",
              position: "absolute",
              top: 12,
              right: 12 
            }}
          />
        </S.TopContainer>

        <S.ContentContainer>
          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>
            <S.Description>
              {t("description")}{" "}
              {formattedImpactText(
                nonProfit,
                impact ?? undefined,
                false,
                false,
              )}
            </S.Description>
          </S.TextContainer>

          {hasCheckbox && (
            <S.CheckboxContainer>
              <CheckBox
                text={t("checkboxText")}
                checked={allowedEmailMarketing}
                onChecked={() =>
                  setAllowedEmailMarketing(!allowedEmailMarketing)
                }
                checkedColor={theme.colors.brand.primary[800]}
                unCheckedColor={theme.colors.neutral[600]}
              />
            </S.CheckboxContainer>
          )}
        </S.ContentContainer>

        <Button
          onPress={handleNavigate}
          text={t("buttonTitle")}
          customTextStyles={{
            color: theme.colors.neutral10,
          }}
          customStyles={{
            backgroundColor: theme.colors.brand.primary[600],
            borderColor: theme.colors.brand.primary[800],
            borderRadius: 12,
          }}
        />
      </S.Container>
      <S.BackgroundSun>
        <LottieAnimation
          animationData={sunAnimation}
          width="100%"
          height={262}
        />
      </S.BackgroundSun>
    </>
  );
}
