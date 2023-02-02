import React from "react";
import { ScrollView } from "react-native";
import { Text } from "components/Themed";
import S from "./styles";
import ImpactCards from "./ImpactCards";
import NgoImpactCards from "./NgoImpactCards";
import { useTranslation } from "react-i18next";

function BadgesProfilePage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });

  return (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <Text style={S.title}>{t("title")}</Text>

      <ImpactCards />

      <NgoImpactCards />
    </ScrollView>
  );
}

export default BadgesProfilePage;
