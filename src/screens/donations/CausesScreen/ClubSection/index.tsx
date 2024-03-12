import { useNavigation } from "hooks/useNavigation";
import { TouchableOpacity, Image } from "react-native";
import { useLanguage } from "contexts/languageContext";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { useFocusEffect } from "@react-navigation/native";
import S from "./styles";

export default function ClubSection(): JSX.Element | null {
  const { currentLang } = useLanguage();
  const { userIsMember } = useSubscriptions();
  const { isMember, refetch } = userIsMember();
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const [isNotMember, setIsNotMember] = useState(false);

  const ctaClub = `https://ribon-produto.s3.amazonaws.com/cta_club_${currentLang}.png`;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    setIsNotMember(!isMember?.isMember);
  }, [isMember]);

  useEffect(() => {
    setIsNotMember(false);
  }, [currentUser]);

  return isNotMember ? (
    <TouchableOpacity
      accessibilityRole="button"
      style={S.imageContainer}
      onPress={() => navigateTo("ClubScreen")}
    >
      <Image
        accessibilityIgnoresInvertColors
        source={{
          uri: ctaClub,
        }}
        style={S.image}
      />
    </TouchableOpacity>
  ) : null;
}
