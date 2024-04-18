import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Button from "components/atomics/buttons/Button";

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

const storeLink =
  Platform.OS === "ios"
    ? "https://apps.apple.com/app/id1337763424"
    : "https://play.google.com/store/apps/details?id=com.app.ribon";

export default function RequiredUpdateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Version!</Text>
      <Button text="Go to store!" onPress={() => Linking.openURL(storeLink)} />
    </View>
  );
}
