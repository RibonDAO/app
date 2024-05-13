import Coupon from "@ribon.io/shared/types/entities/Coupon";
import { useNavigation } from "hooks/useNavigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { View, Text, TouchableOpacity } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import ArrowLeft from "components/vectors/ArrowLeft";

import { logEvent } from "services/analytics";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCoupons } from "hooks/useCoupons";
import { useCouponContext } from "contexts/couponContext";
import { Loader } from "rn-placeholder";
import S from "./styles";
import Ticket from "./assets/Ticket";

export default function GiveTicketByCouponScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketByCouponScreen",
  });

  const { couponId, setCouponId } = useCouponContext();
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { handleCanCollectByCoupon, handleCollectByCoupon } = useCoupons();
  const [couponData, setCouponData] = useState<Coupon | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function canCollectByCoupon() {
    const canCollectByCouponData = await handleCanCollectByCoupon();
    setLoading(false);
    if (!canCollectByCouponData.canCollect) {
      navigateTo("ExpiredCouponScreen");
    } else {
      setCouponData(canCollectByCouponData.coupon);
    }
  }

  useEffect(() => {
    logEvent("P37_view", { couponId });
    setLoading(true);
    if (currentUser) {
      canCollectByCoupon();
    } else {
      navigateTo("SignInCouponScreen");
    }
  }, [currentUser]);

  async function receiveTicket() {
    await handleCollectByCoupon({
      onSuccess: () => {
        setCouponId(undefined);
        logEvent("ticketCollected", { from: "coupon" });
        navigateTo("TabNavigator", { screen: "CausesScreen" });
      },
      onError: () => {
        setCouponId(undefined);
        navigateTo("ExpiredCouponScreen");
      },
    });
  }

  const handleBackButtonClick = () => {
    logEvent("P37_getTicketBtn_click");
    navigateTo("TabNavigator", { screen: "CausesScreen" });
  };

  const numberOfTickets = couponData?.numberOfTickets || 1;

  return loading ? (
    <View style={S.container}>
      <Loader />
    </View>
  ) : (
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
            {numberOfTickets > 1
              ? t("titlePlural", { numberOfTickets })
              : t("title")}
          </Text>
          <Text style={S.subtitle}>
            {couponData?.couponMessage?.rewardText}
          </Text>
        </View>

        <Button
          text={t("button")}
          onPress={() => receiveTicket()}
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
