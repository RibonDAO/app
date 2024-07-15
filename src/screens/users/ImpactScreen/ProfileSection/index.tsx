import { useTranslation } from "react-i18next";

import { useUserProfile, useSubscriptions } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useAuthentication } from "contexts/authenticationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared";
import { logEvent } from "services/analytics";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import Sparkles from "screens/promoters/ClubScreen/Header/assets/Sparkles";
import BackgroundShapeRight from "components/vectors/BackgroundShapes/BackgroundShapeRight";
import VerifiedIcon from "components/vectors/VerifiedIcon";
import BackgroundShapeLeft from "components/vectors/BackgroundShapes/BackgroundShapeLeft";
import LoadingOverlay from "components/moleculars/modals/LoadingOverlay";
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
  const { userIsClubMember } = useSubscriptions();
  const {
    isClubMember,
    isLoading: isClubMemberLoading,
    refetch: refetchIsClubMember,
  } = userIsClubMember();

  const { profile, refetch } = userProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchIsClubMember();
      setNewProfile(profile);
      if (!accessToken) setNewProfile(undefined);
    }, [profile, accessToken]),
  );

  const handleClick = () => {
    if (isClubMember) return;
    logEvent("clubCTA_click", {
      from: "impact_page",
    });

    navigateTo("ClubScreen");
  };

  useEffect(() => {
    if (!isClubMemberLoading) {
      logEvent("clubCTA_view", {
        from: "impact_page",
      });
    }
  }, [isClubMemberLoading, isClubMember]);

  if (!currentUser) return <View />;
  if (isClubMemberLoading) return <LoadingOverlay />;

  return (
    <S.Container clubMember={isClubMember}>
      <S.ContainerShapeLeft>
        <BackgroundShapeLeft
          color={isClubMember ? theme.colors.brand.tertiary[800] : undefined}
        />
      </S.ContainerShapeLeft>
      <S.ContainerShapeRight>
        <BackgroundShapeRight
          color={isClubMember ? theme.colors.brand.tertiary[800] : undefined}
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
        {isClubMember && (
          <S.Sparkles>
            <Sparkles />
          </S.Sparkles>
        )}
        <S.TagContainer onPress={handleClick}>
          <S.ClubTag clubMember={isClubMember}>
            <S.TagText clubMember={isClubMember}>
              {isClubMember ? t("clubTagText") : t("noClubTagText")}
            </S.TagText>
          </S.ClubTag>
          {isClubMember && (
            <VerifiedIcon
              color={theme.colors.brand.quaternary[300]}
              insideColor="black"
            />
          )}
        </S.TagContainer>
      </S.CenterContainer>
      {!isClubMember && (
        <S.ClubCta onPress={handleClick}>
          <S.ClubCtaText>{t("ctaClubText")}</S.ClubCtaText>
        </S.ClubCta>
      )}
    </S.Container>
  );
}

export default ProfileSection;
