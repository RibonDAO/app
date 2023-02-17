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
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingBottom: 40 }}>
        <View style={S.cardsSection}>
          <Text style={S.title}>{t("title")}</Text>
          <ImpactCards />
        </View>

        <TabViewSection />
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
