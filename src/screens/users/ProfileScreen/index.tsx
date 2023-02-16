import React from "react";
import { useTranslation } from "react-i18next";
import { Text, ScrollView, View } from "react-native";
import ImpactCards from "./ImpactCards";
import TabViewSection from "./TabViewSection";
import S from "./styles";

function ProfileScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });

  return (
    <ScrollView
      style={S.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={S.cardsSection}>
        <Text style={S.title}>{t("title")}</Text>
        <ImpactCards />
      </View>

      <TabViewSection />
    </ScrollView>
  );
}

export default ProfileScreen;
