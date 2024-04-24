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
import S from "./styles";
import Ticket from "./assets/Ticket";

export default function GiveTicketByCouponScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketByCouponScreen",
  });

  interface ICoupon {
    id: string;
    numberOfTickets: number;
    rewardText?: string;
  }

  const { couponId, setCouponId } = useCouponContext();
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { handleCanCollectByCoupon, handleCollectByCoupon } = useCoupons();
  const [coupon, setCoupon] = useState<ICoupon | undefined>(undefined);

  async function canCollectByCoupon() {
    const canCollectByCouponData = await handleCanCollectByCoupon();
    if (!canCollectByCouponData.canCollectByCoupon) {
      navigateTo("ExpiredCouponScreen");
    } else {
      setCoupon(canCollectByCouponData.coupon);
    }
  }

  useEffect(() => {
    logEvent("P37_view", { couponId });
    if (!currentUser) {
      navigateTo("SignInCouponScreen");
    }
  }, []);

  useEffect(() => {
    canCollectByCoupon();
  }, []);

  async function receiveTicket() {
    await handleCollectByCoupon({
      onSuccess: () => {
        setCouponId(undefined);
        navigateTo("ReceiveTicketScreen");
      },
      onError: () => {
        navigateTo("ExpiredCouponScreen");
      },
    });
  }

  const handleBackButtonClick = () => {
    logEvent("P37_getTicketBtn_click");
    navigateTo("CausesScreen");
  };

  const numberOfTickets = coupon?.numberOfTickets || 1;

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
            {numberOfTickets > 1
              ? t("titlePlural", { numberOfTickets })
              : t("title")}
          </Text>
          <Text style={S.subtitle}>{t("subtitle")}</Text>
          {/* TODO: add reward text as subtitle */}
        </View>

        <Button
          text={t("button")}
          onPress={() => receiveTicket}
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
