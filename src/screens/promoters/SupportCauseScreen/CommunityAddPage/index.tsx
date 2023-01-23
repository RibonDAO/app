import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { Languages } from "types/enums/Languages";
import { Text, View } from "components/Themed";
import { Image } from "react-native";
import Button from "components/atomics/buttons/Button";
import { RootStackScreenProps } from "types";
import styles from "./styles";
import CommunityAddCycle from "./assets/community-add-cycle.png";
import CommunityAddCyclePT from "./assets/community-add-cycle-pt.png";

function CommunityAddPage({
  route,
}: RootStackScreenProps<"CommunityAddModal">): JSX.Element {
  const { popNavigation } = useNavigation();
  const { amount } = route.params;
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage.communityAddPage",
  });
  const { currentLang } = useLanguage();

  function communityAddImage() {
    return currentLang === Languages.EN
      ? CommunityAddCycle
      : CommunityAddCyclePT;
  }

  return (
    <View style={styles.desktopContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {t("title", { value: amount })}
        </Text>
        <Image source={communityAddImage()} style={styles.image} />
        <Button
          text={t("button", { value: amount })}
          onPress={popNavigation}
          customStyles={styles.donateButton}
        />
      </View>
    </View>
  );
}

export default CommunityAddPage;
