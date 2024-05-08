import { View } from "react-native";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import { useTranslation } from "react-i18next";

import { useSubscriptions } from "@ribon.io/shared/hooks";
import { useNavigation } from "hooks/useNavigation";
import { usePaymentFailedNotification } from "contexts/paymentFailedNotificationContext";

export default function NotificationPaymentFailed() {
  const { userSubscriptions } = useSubscriptions();
  const { navigateTo } = useNavigation();
  const { visible, handleCloseNotificationClick } =
    usePaymentFailedNotification();
  const { subscriptions } = userSubscriptions();

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.paymentFailedNotification",
  });

  const subscription = subscriptions && subscriptions[subscriptions.length - 1];

  const lastPayment =
    subscription &&
    subscription?.personPayments[subscription.personPayments.length - 1];

  const isPix = lastPayment && lastPayment.paymentMethod === "pix";

  const navigateToClubCheckout = () => {
    navigateTo("ClubScreen", {
      ignoreBenefitsSection: true,
    });
  };

  return (
    visible && (
      <View style={{ paddingBottom: 16 }}>
        <InlineNotification
          title={t(isPix ? "pixTitle" : "cardTitle")}
          description={t(isPix ? "pixDescription" : "cardDescription")}
          type="warning"
          firstLink={t("link") || "ou"}
          onFirstLinkClick={navigateToClubCheckout}
          onCloseClick={handleCloseNotificationClick}
        />
      </View>
    )
  );
}
