import React from "react";
import { Button, View, Text, Image } from "react-native";
import { RootStackScreenProps } from "types";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export default function DonationDonePage({
  route,
  navigation,
}: RootStackScreenProps<"DonationDonePage">) {
  const { nonProfit } = route.params;
  return (
    <View style={S.container}>
      <View style={S.diamond}>
        <Image style={S.cardImage} source={{ uri: nonProfit.mainImage }} />
      </View>
      <Text style={S.title}>Congratulations!</Text>
      <Text style={S.description}>
        You donated {nonProfit.impactByTicket} {nonProfit.impactDescription} to{" "}
        {nonProfit.name}.
      </Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Close"
        color={theme.colors.green30}
      />
    </View>
  );
}
