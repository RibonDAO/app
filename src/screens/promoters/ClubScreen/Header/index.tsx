import { View, Text, ImageBackground } from "react-native";

import { useTranslation } from "react-i18next";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useAuthentication } from "contexts/authenticationContext";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import UserAvatar from "screens/users/ImpactScreen/ProfileSection/UserAvatar";

import S from "./styles";
import PinkSun from "./assets/pink-sun.png";
import RibonFlag from "./assets/RibonFlag";

function Header(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.header",
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

  return (
    <ImageBackground source={PinkSun} style={S.container} resizeMode="contain">
      {currentUser ? (
        <UserAvatar userAvatar={newProfile?.photo} showInfo={false} isMember />
      ) : (
        <RibonFlag />
      )}
      <View style={S.textContainer}>
        <View style={S.tag}>
          <Text style={S.text}>{t("ribonClub")}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Header;
