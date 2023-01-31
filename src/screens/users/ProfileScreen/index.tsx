import React, { useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Text } from "components/Themed";
import S from "./styles";
import ImpactCards from "./ImpactCards";
import NgoImpactCard from "./NgoImpactCard";
import NgoImpactCards from "./NgoImpactCards";

type Props = {
  image: string;
  onPress: () => void;
  active?: boolean;
  name: string;
};

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
