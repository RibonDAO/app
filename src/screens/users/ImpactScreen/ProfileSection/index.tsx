import { useTranslation } from "react-i18next";

import { useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import { View } from "react-native";
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

  const { profile, refetch } = userProfile();

  useEffect(() => {
    refetch();
  }, [profile]);

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
          userAvatar={profile?.photo}
          name={profile?.name ? profile.name : t("userName")}
          email={profile?.user?.email ? profile.user.email : currentUser?.email}
        />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ProfileSection;
