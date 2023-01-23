import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "components/Themed";
import { RootTabScreenProps } from "types";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoPage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default function SupportCauseScreen({
  navigation,
}: RootTabScreenProps<"PromotersScreen">) {
  const [pageType] = useState<"card" | "crypto">("crypto");

  if (pageType === "crypto") {
    return <CryptoPage />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promoters</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
