import { useNavigation } from "hooks/useNavigation";
import { TouchableOpacity, Image } from "react-native";
import { useLanguage } from "contexts/languageContext";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { logEvent } from "services/analytics";
import S from "./styles";

export default function ClubSection(): JSX.Element | null {
  const { currentLang } = useLanguage();
  const { userIsMember } = useSubscriptions();
  const { isMember, refetch } = userIsMember();
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const ctaClub = `https://ribon-produto.s3.amazonaws.com/cta_club_${currentLang}.png`;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    logEvent("clubCTA_view", { from: "donateTickets_page" });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentUser]);

  function handleClick() {
    logEvent("clubCTA_click", { from: "donateTickets_page" });
    navigateTo("ClubScreen");
  }

  return !isLoading && !isMember ? (
    <TouchableOpacity
      accessibilityRole="button"
      style={S.imageContainer}
      onPress={() => handleClick()}
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
