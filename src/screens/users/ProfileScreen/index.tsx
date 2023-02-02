import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import S from "./styles";
import ImpactCards from "./ImpactCards";
import NgoImpactCards from "./NgoImpactCards";

function BadgesProfilePage() {
  return (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <Text style={S.title}>My Impact</Text>

      <ImpactCards />

      <NgoImpactCards />
    </ScrollView>
  );
}

export default BadgesProfilePage;
