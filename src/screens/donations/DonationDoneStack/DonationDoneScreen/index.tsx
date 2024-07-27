import React, { useCallback, useEffect, useState } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import {
  apiGet,
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
import donationDoneSound from "./assets/donation-done.mp3";
import NonProfitImagePlaceholder from "./NonProfitImagePlaceholder";
import sunAnimation from "./assets/sunAnimation.json";
import * as S from "./styles";
import { Text, View } from "react-native";
import { defaultBodyXsSemibold } from "styles/typography/default";
import { Image } from "expo-image";

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
  const [totalDonations, setTotalDonations] = useState(0);

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
    // playSound(donationDoneSound);
    if (shouldShowEmailCheckbox()) {
      logEvent("acceptReceiveEmail_view", {
        from: "confirmedDonation_page",
      });
    }

    const fetchTodayDonationsCount = async () => {
      const result = await apiGet("count_today_donations");
      if (result.status !== 200) return;

      const { data } = result;

      setTotalDonations(data.todayDonations);
    };

    fetchTodayDonationsCount().catch(console.error);
  }, []);

  const hasCheckbox = false; //shouldShowEmailCheckbox();

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

          {!hasCheckbox && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  gap: -8,
                  justifyContent: "center",
                  marginBottom: 8
                }}
              >
                <Image
                  source={{ uri: "https://picsum.photos/id/64/200/200" }}
                  accessibilityIgnoresInvertColors
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    borderColor: "white",
                    borderWidth: 2,
                  }}
                />
                <Image
                  source={{ uri: "https://picsum.photos/id/64/200/200" }}
                  accessibilityIgnoresInvertColors
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    borderColor: "white",
                    borderWidth: 2,
                  }}
                />
                <Image
                  source={{ uri: "https://picsum.photos/id/64/200/200" }}
                  accessibilityIgnoresInvertColors
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    borderColor: "white",
                    borderWidth: 2,
                  }}
                />
              </View>
              <Text
                style={{
                  ...defaultBodyXsSemibold,
                  color: theme.colors.neutral[600],
                  fontSize: 12,
                }}
              >
                Mais de {totalDonations} pessoas já doaram hoje
              </Text>
            </View>
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
