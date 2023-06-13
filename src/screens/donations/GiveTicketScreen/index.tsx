import { useNavigation } from "hooks/useNavigation";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { View, Text } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function GiveTicketScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketScreen",
  });

  const { navigateTo } = useNavigation();

  const receiveTicket = () => {
    navigateTo("/receiveTicket");
  };

  return (
    <View style={S.container}>
      <View style={S.content}>
        <Ticket />
        <View style={S.textContainer}>
          <Text style={S.title}>{t("ribonTitle")}</Text>
          <Text style={S.subtitle}>{t("subtitle")}</Text>
        </View>

        <Button
          text={t("button")}
          onPress={receiveTicket}
          borderColor={theme.colors.brand.primary[600]}
          backgroundColor={theme.colors.brand.primary[600]}
          customTextStyles={{
            fontWeight: "600",
          }}
          textColor={theme.colors.neutral10}
          customStyles={{
            borderWidth: 1,
            borderRadius: 4,
            width: 328,
            marginBottom: 16,
            height: 48,
          }}
        />
      </View>
    </View>
  );
}
