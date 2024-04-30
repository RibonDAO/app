import { useNavigation } from "hooks/useNavigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCouponContext } from "contexts/couponContext";
import Button from "components/atomics/buttons/Button";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import ArrowLeft from "components/vectors/ArrowLeft";

import { logEvent } from "services/analytics";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function ExpiredCouponScreen() {
  const { setCouponId } = useCouponContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "content.expiredCouponScreen",
  });
  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P38_view");
    setCouponId(undefined);
  }, []);

  async function handleCouponIdAndNavigation() {
    await setCouponId(undefined);
    navigateTo("CausesScreen");
  }

  const handleBackButtonClick = () => {
    handleCouponIdAndNavigation();
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
          <Text style={S.title}>{t("title")}</Text>
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
