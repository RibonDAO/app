import { View, Text } from "react-native";
import styles from "./styles";
import CellPhone from "./assets/CellPhone";
import Button from "components/atomics/buttons/Button";
import AbstractForm from "./assets/AbstractForm";
import { useTranslation } from "react-i18next";
import { useNavigation } from "hooks/useNavigation";

export default function LockedSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.lockedSection",
  });

  const { navigateTo } = useNavigation();

  const handleButtonClick = () => {
    navigateTo("CausesScreen");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.abstractFormContainer}>
        <AbstractForm />
      </View>
      <View>
        <View style={styles.container}>
          <CellPhone />
          <Text style={styles.title}>{t("title")}</Text>
          <Text style={styles.subtitle}>{t("subtitle")}</Text>
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
