import { useNavigation } from "hooks/useNavigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useRouteParams } from "hooks/useRouteParams";
import ArrowLeft from "components/vectors/ArrowLeft";

import { logEvent } from "services/analytics";
import { useTicketsContext } from "contexts/ticketsContext";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function ExpiredCouponScreen() {
  const { params } = useRouteParams<"ExpiredCouponScreen">();
  const { t } = useTranslation("translation", {
    keyPrefix: "content.expiredCouponScreen",
  });

  const { navigateTo } = useNavigation();
  const { ticketsCounter } = useTicketsContext();

  useEffect(() => {
    logEvent("P38_view", params);
  }, []);

  const handleBackButtonClick = () => {
    navigateTo("CausesScreen");
  };

  return (
    <View style={S.container}>
      <View style={S.arrow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleBackButtonClick}
          testID="arrow-back-button"
        >
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <View style={S.content}>
        <Ticket />
        <View style={S.textContainer}>
          <Text style={S.title}>
            {ticketsCounter > 1
              ? t("titlePlural", { ticketsCounter })
              : t("title")}
          </Text>
          <Text style={S.subtitle}>{t("subtitle")}</Text>
        </View>

        <Button
          text={t("button")}
          onPress={() => navigateTo("CausesScreen")}
          borderColor={theme.colors.brand.primary[600]}
          backgroundColor={theme.colors.brand.primary[600]}
          customTextStyles={{
            fontWeight: "600",
          }}
          textColor={theme.colors.neutral10}
          customStyles={{
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: 16,
            height: 48,
            width: 328,
          }}
        />
      </View>
    </View>
  );
}
