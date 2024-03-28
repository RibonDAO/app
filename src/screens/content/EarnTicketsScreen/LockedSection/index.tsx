import { View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";
import ImageWithInfoLayout from "components/moleculars/layouts/ImageWithInfoLayout";
import styles from "./styles";

export default function LockedSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.lockedSection",
  });
  const { navigateTo } = useNavigation();

  const handleButtonClick = () => {
    navigateTo("CausesScreen");
  };

  return (
    <View style={styles.outerContainer}>
      <View>
        <View style={styles.container}>
          <ImageWithInfoLayout
            title={t("title") || ""}
            description={t("subtitle") || ""}
          />
          <Button
            text={t("cta")}
            onPress={handleButtonClick}
            customStyles={styles.button}
            customTextStyles={styles.buttonText}
            outline={false}
          />
        </View>
      </View>
    </View>
  );
}
