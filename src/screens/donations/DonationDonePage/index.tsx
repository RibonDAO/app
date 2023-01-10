import React from "react";
import { Button, View, Text } from "react-native";
import { RootStackScreenProps } from "src/../types";
import theme from "styles/theme";
import * as S from "screens/donations/DonationDonePage/styles";

export default function DonationDonePage({
  route,
  navigation,
}: RootStackScreenProps<"DonationDonePage">) {
  const { nonProfit } = route.params;
  return (
    <S.Container>
      <View style={S.inline.diamond}>
        <S.CardImage source={{ uri: nonProfit.mainImage }} />
      </View>
      <S.Title>Congratulations!</S.Title>
      <S.Description>
        You donated {nonProfit.impactByTicket} {nonProfit.impactDescription} to{" "}
        {nonProfit.name}.
      </S.Description>
      <Button
        onPress={() => navigation.goBack()}
        title="Close"
        color={theme.colors.ribonBlue}
      />
    </S.Container>
  );
}
