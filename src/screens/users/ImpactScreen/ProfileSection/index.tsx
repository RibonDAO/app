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
import RibonFlagIcon from "components/vectors/RibonFlagIcon";
import TicketOutlinedIcon from "components/vectors/TicketOutlinedIcon";
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
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });
  const { profile, refetch } = userProfile();
  const [donatedTicketsModalVisible, setDonatedTicketsModalVisible] =
    useState(false);
  const [daysDonatingModalVisible, setDaysDonatingModalVisible] =
    useState(false);

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

  useEffect(() => {
    if (!isMemberLoading) {
      logEvent("clubCTA_view", {
        from: "impact_page",
      });
    }
  }, [isMemberLoading, isMember]);

  return (
    <S.Container member={isMember}>
      <S.ShapeContainer>
        <ProfileTopShape isMember={isMember} />
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
              isMember={isMember}
            />

            <S.TagContainer onPress={handleClick}>
              <S.ClubTag member={isMember}>
                <S.TagText member={isMember}>
                  {isMember ? t("clubTagText") : t("noClubTagText")}
                </S.TagText>
              </S.ClubTag>
            </S.TagContainer>
          </>
        )}

        <S.StatisticsContainer additionalTopMargin={!currentUser}>
          <StatisticsCard
            backgroundColor={theme.colors.brand.primary[25]}
            description={t("donatedTickets")}
            icon={<TicketOutlinedIcon />}
            value={currentUser ? userStatistics?.totalTickets : 0}
            handlePress={() => setDonatedTicketsModalVisible(true)}
          />
          <ModalDialog
            setVisible={setDonatedTicketsModalVisible}
            visible={donatedTicketsModalVisible}
            title={t("donatedTickets")}
            description={t("donatedTicketsDescription")}
            primaryButton={{
              text: "Fechar",
              onPress() {
                setDonatedTicketsModalVisible(false);
              },
            }}
          />

          <StatisticsCard
            backgroundColor={theme.colors.brand.primary[25]}
            description={t("daysDoingGood")}
            icon={<RibonFlagIcon />}
            value={currentUser ? userStatistics?.daysDonating : 0}
            handlePress={() => setDaysDonatingModalVisible(true)}
          />
          <ModalDialog
            setVisible={setDaysDonatingModalVisible}
            visible={daysDonatingModalVisible}
            title={t("daysDoingGood")}
            description={t("daysDoingGoodDescription")}
            primaryButton={{
              text: "Fechar",
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
