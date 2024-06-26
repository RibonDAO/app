import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "types/enums/Languages";
import { Text, View } from "react-native";
import { Image } from "react-native";
import Button from "components/atomics/buttons/Button";
import { RootStackScreenProps } from "types";
import usePageView from "hooks/usePageView";
import styles from "./styles";
import CommunityAddCycle from "./assets/community-add-cycle.png";
import CommunityAddCyclePT from "./assets/community-add-cycle-pt.png";

function CommunityAddScreen({
  route,
}: RootStackScreenProps<"CommunityAddModal">): JSX.Element {
  usePageView("P22_view");
  const { popNavigation } = useNavigation();
  const { amount } = route.params;
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen.communityAddScreen",
  });
  const { currentLang } = useLanguage();

  function communityAddImage() {
    return currentLang === Languages.EN
      ? CommunityAddCycle
      : CommunityAddCyclePT;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title", { value: amount })}</Text>
      <Image
        source={communityAddImage()}
        style={styles.image}
        accessibilityIgnoresInvertColors
      />
      <Button
        text={t("button", { value: amount })}
        onPress={popNavigation}
        customStyles={styles.donateButton}
      />
    </View>
  );
}

export default CommunityAddScreen;
