import { useTranslation } from "react-i18next";

import { useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useAuthentication } from "contexts/authenticationContext";
import { useFocusEffect } from "@react-navigation/native";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import BackgroundShapeLeft from "./assets/BackgroundShapeLeft";
import BackgroundShapeRight from "./assets/BackgroundShapeRight";
import * as S from "./styles";
import UserAvatar from "./UserAvatar";

function ProfileSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection",
  });

  const { userProfile } = useUserProfile();
  const { currentUser } = useCurrentUser();
  const { accessToken } = useAuthentication();
  const [newProfile, setNewProfile] = useState<UserProfile>();

  const { profile, refetch } = userProfile();

  useFocusEffect(
    useCallback(() => {
      refetch();
      setNewProfile(profile);
      if (!accessToken) setNewProfile(undefined);
    }, [profile, accessToken]),
  );

  if (!currentUser) return <View />;

  return (
    <S.Container>
      <S.ContainerShapeLeft>
        <BackgroundShapeLeft />
      </S.ContainerShapeLeft>
      <S.ContainerShapeRight>
        <BackgroundShapeRight />
      </S.ContainerShapeRight>
      <S.CenterContainer>
        <UserAvatar
          userAvatar={newProfile?.photo}
          name={newProfile?.name ? newProfile.name : t("userName")}
          email={
            newProfile?.user?.email ? newProfile.user.email : currentUser?.email
          }
        />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ProfileSection;
