import { View, Text, ImageBackground } from "react-native";

import { useTranslation } from "react-i18next";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useAuthentication } from "contexts/authenticationContext";
import UserProfile from "@ribon.io/shared/types/entities/UserProfile";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import UserAvatar from "screens/users/ImpactScreen/ProfileSection/UserAvatar";

import VerifiedIcon from "components/vectors/VerifiedIcon";
import Sparkles from "./assets/Sparkles";
import S from "./styles";
import RibonFlag from "./assets/RibonFlag";
import PinkSun from "./assets/pink-sun.png";

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
      {currentUser && newProfile ? (
        <UserAvatar
          userAvatar={newProfile?.photo}
          email={
            newProfile?.user?.email ? newProfile.user.email : currentUser?.email
          }
          showInfo={false}
        />
      ) : (
        <RibonFlag />
      )}
      <View style={S.sparkles}>
        <Sparkles />
      </View>
      <View style={S.textContainer}>
        <View style={S.tag}>
          <Text style={S.text}>{t("ribonClub")}</Text>
        </View>
        <VerifiedIcon />
      </View>
    </ImageBackground>
  );
}

export default Header;
