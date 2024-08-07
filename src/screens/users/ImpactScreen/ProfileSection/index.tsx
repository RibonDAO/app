import { useTranslation } from "react-i18next";
import {
  useUserProfile,
  useSubscriptions,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useEffect, useState } from "react";
import { useAuthentication } from "contexts/authenticationContext";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "hooks/useNavigation";
import { logEvent } from "services/analytics";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import ProfileTopShape from "components/vectors/ProfileTopShape";
import StatisticsCard from "components/moleculars/StatisticsCard";
import { theme } from "@ribon.io/shared";
import HeaderButtons from "components/moleculars/HeaderButtons";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import CalendarIcon from "components/vectors/CalendarIcon";
import TicketColorsIcon from "components/vectors/TicketColorsIcon";
import { useBusinessSubscriptionContext } from "contexts/businessSubscriptionContext";
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
  const { isBusinessMember } = useBusinessSubscriptionContext();
  const {
    isClubMember,
    isLoading: isClubMemberLoading,
    refetch: refetchIsClubMember,
  } = userIsClubMember();
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });
  const { profile, refetch } = userProfile();
  const [donatedTicketsModalVisible, setDonatedTicketsModalVisible] =
    useState(false);
  const [daysDonatingModalVisible, setDaysDonatingModalVisible] =
    useState(false);
  const [userType, setUserType] = useState("free");

  const verifyUserType = () => {
    if (isClubMember) return "club";
    else if (isBusinessMember) return "business";
    return "free";
  };

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

  useFocusEffect(
    useCallback(() => {
      setUserType(verifyUserType());
    }, [profile, isClubMember, isBusinessMember]),
  );

  const statisticsBackgroundColor = () => {
    if (isClubMember) return theme.colors.brand.tertiary[25];
    else if (isBusinessMember) return theme.colors.brand.quinary[25];
    return theme.colors.brand.primary[25];
  };

  return (
    <S.Container type={userType}>
      <S.ShapeContainer>
        <ProfileTopShape userType={userType} />
      </S.ShapeContainer>
      <S.HeaderButtonsContainer>
        <HeaderButtons showsTicketsCounter />
      </S.HeaderButtonsContainer>
      <S.CenterContainer>
        {currentUser && (
          <>
            <UserAvatar
              userAvatar={newProfile?.photo}
              name={newProfile?.name ? newProfile.name : t("userName")}
              email={
                newProfile?.user?.email
                  ? newProfile.user.email
                  : currentUser?.email
              }
              isClubMember={isClubMember}
              isBusinessMember={isBusinessMember}
            />

            {isBusinessMember && (
              <S.TagContainer disabled>
                <S.BusinessTag>
                  <S.TagBusinessText>{t("businessTag")}</S.TagBusinessText>
                </S.BusinessTag>
              </S.TagContainer>
            )}

            <S.TagContainer disabled={isClubMember} onPress={handleClick}>
              <S.ClubTag clubMember={isClubMember}>
                <S.TagText clubMember={isClubMember}>
                  {isClubMember ? t("clubTagText") : t("noClubTagText")}
                </S.TagText>
              </S.ClubTag>
            </S.TagContainer>
          </>
        )}

        <S.StatisticsContainer additionalTopMargin={!currentUser}>
          <StatisticsCard
            backgroundColor={statisticsBackgroundColor()}
            description={t("donatedTickets")}
            icon={<TicketColorsIcon />}
            value={currentUser ? userStatistics?.totalTickets : 0}
            handlePress={() => setDonatedTicketsModalVisible(true)}
          />
          <ModalDialog
            setVisible={setDonatedTicketsModalVisible}
            visible={donatedTicketsModalVisible}
            title={t("donatedTickets")}
            description={t("donatedTicketsDescription")}
            primaryButton={{
              text: t("close"),
              onPress() {
                setDonatedTicketsModalVisible(false);
              },
            }}
          />

          <StatisticsCard
            backgroundColor={
              isClubMember
                ? theme.colors.brand.tertiary[25]
                : theme.colors.brand.primary[25]
            }
            description={t("daysDoingGood")}
            icon={<CalendarIcon />}
            value={currentUser ? userStatistics?.daysDonating : 0}
            handlePress={() => setDaysDonatingModalVisible(true)}
          />
          <ModalDialog
            setVisible={setDaysDonatingModalVisible}
            visible={daysDonatingModalVisible}
            title={t("daysDoingGood")}
            description={t("daysDoingGoodDescription")}
            primaryButton={{
              text: t("close"),
              onPress() {
                setDaysDonatingModalVisible(false);
              },
            }}
          />
        </S.StatisticsContainer>
      </S.CenterContainer>
    </S.Container>
  );
}

export default ProfileSection;
