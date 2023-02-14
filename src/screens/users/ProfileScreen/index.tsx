import React from "react";
import { Text, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import ImpactCards from "./ImpactCards";
import TabViewSection from "./TabViewSection"
import S from "./styles";


function ProfileScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });

  return (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <View style={S.cardsSection}>
        <Text style={S.title}>{t("title")}</Text>
        <ImpactCards />
      </View>

      <TabViewSection />
    </ScrollView>
  );
}

export default ProfileScreen;
