import { useTranslation } from "react-i18next";

import { useUserProfile, useSubscriptions } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useAuthentication } from "contexts/authenticationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import Sparkles from "screens/promoters/ClubScreen/Header/assets/Sparkles";
import BackgroundShapeRight from "components/vectors/BackgroundShapes/BackgroundShapeRight";
import VerifiedIcon from "components/vectors/VerifiedIcon";
import { logEvent } from "services/analytics";
import UserAvatar from "./UserAvatar";
import * as S from "./styles";

function ProfileSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection",
  });
  const { userProfile } = useUserProfile();
  const { currentUser } = useCurrentUser();
  const { accessToken } = useAuthentication();
  const [newProfile, setNewProfile] = useState<UserProfile>();
  const { navigateTo } = useNavigation();
  const { userIsMember } = useSubscriptions();
  const {
    isMember,
    isLoading: isMemberLoading,
    refetch: refetchIsMember,
  } = userIsMember();

  const { profile, refetch, isLoading } = userProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchIsMember();
      setNewProfile(profile);
      if (!accessToken) setNewProfile(undefined);
    }, [profile, accessToken]),
  );

  const handleClick = () => {
    if (isMember) return;
    logEvent("clubCTA_click", {
      from: "impact_page",
    });

    navigateTo("ClubScreen");
  };

  if (!currentUser || isLoading || isMemberLoading) return <View />;

  return (
    <S.Container member={isMember}>
      <S.ContainerShapeRight>
        <BackgroundShapeRight
          color={isMember ? theme.colors.brand.tertiary[800] : undefined}
        />
      </S.ContainerShapeRight>
      <S.CenterContainer>
        <UserAvatar
          userAvatar={newProfile?.photo}
          name={newProfile?.name ? newProfile.name : t("userName")}
          email={
            newProfile?.user?.email ? newProfile.user.email : currentUser?.email
          }
        />
        {isMember && (
          <S.Sparkles>
            <Sparkles />
          </S.Sparkles>
        )}
        <S.TagContainer onPress={handleClick}>
          <S.ClubTag member={isMember}>
            <S.TagText member={isMember}>
              {isMember ? t("clubTagText") : t("noClubTagText")}
            </S.TagText>
          </S.ClubTag>
          {isMember && (
            <VerifiedIcon
              color={theme.colors.brand.quaternary[300]}
              insideColor="black"
            />
          )}
        </S.TagContainer>
      </S.CenterContainer>
      {!isMember && (
        <S.ClubCta onPress={handleClick}>
          <S.ClubCtaText>{t("ctaClubText")}</S.ClubCtaText>
        </S.ClubCta>
      )}
    </S.Container>
  );
}

export default ProfileSection;
