import { useNavigation } from "hooks/useNavigation";
import { TouchableOpacity, Image } from "react-native";
import { useUserSubscription } from "@ribon.io/shared/hooks";
import { useLanguage } from "contexts/languageContext";
import S from "./styles";

export default function ClubSection(): JSX.Element {
  const { currentLang } = useLanguage();
  const { userIsMember } = useUserSubscription();
  const { isMember } = userIsMember();
  const { navigateTo } = useNavigation();

  const ctaClub = `https://ribon-produto.s3.amazonaws.com/cta_club_${currentLang}.png`;

  return !isMember ? (
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
  ) : (
    <div />
  );
}
