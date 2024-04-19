import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacingNative(20),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: theme.spacingNative(16),
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

const { t } = useTranslation("translation", {
  keyPrefix: "requiredUpdateScrren",
});

const storeLink = Platform.OS === "ios" ? t("iosLink") : t("androidLink");

export default function RequiredUpdateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title")}</Text>
      <Button text={t("button")} onPress={() => Linking.openURL(storeLink)} />
    </View>
  );
}
