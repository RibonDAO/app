import { useSubscriptions } from "@ribon.io/shared/hooks";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "lib/localStorage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface IPaymentFailedNotificationContext {
  visible: boolean | undefined;
  setVisible: (status: boolean) => void;
  handleCloseNotificationClick?: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const PaymentFailedNotificationContext =
  createContext<IPaymentFailedNotificationContext>(
    {} as IPaymentFailedNotificationContext,
  );

function PaymentFailedNotificationProvider({ children }: Props) {
  const [visible, setVisible] = useState<boolean>();
  const { userSubscriptions } = useSubscriptions();
  const { subscriptions, refetch: refetchSubscription } = userSubscriptions();

  const subscription = subscriptions && subscriptions[subscriptions.length - 1];

  const lastPayment =
    subscription &&
    subscription?.personPayments[subscription.personPayments.length - 1];

  const isClubPaymentFailed =
    lastPayment &&
    lastPayment.status === "failed" &&
    lastPayment.offer.category === "club" &&
    subscription?.status === "inactive";

  const HAS_CLOSED_FAILED_PAYMENT_NOTIFICATION_KEY = `HAS_CLOSED_FAILED_PAYMENT_NOTIFICATION${lastPayment?.id}`;

  const HAS_SEEN_FAILED_PAYMENT_NOTIFICATION_AGAIN_KEY = `HAS_SEEN_FAILED_PAYMENT_NOTIFICATION_AGAIN${lastPayment?.id}`;

  const LAST_PERSON_PAYMENT_ID_KEY = "LAST_PERSON_PAYMENT_ID";

  const activePersonPaymentId = async () => {
    const value = await getLocalStorageItem(LAST_PERSON_PAYMENT_ID_KEY);
    return value;
  };

  const hasClosedNotification = async () => {
    const value = await getLocalStorageItem(
      HAS_CLOSED_FAILED_PAYMENT_NOTIFICATION_KEY,
    );
    return value === "true";
  };

  const hasSeenNotificationAgain = async () => {
    const value = await getLocalStorageItem(
      HAS_SEEN_FAILED_PAYMENT_NOTIFICATION_AGAIN_KEY,
    );
    return value === "true";
  };

  const removeOldKeys = async () => {
    const personPaymentId = await activePersonPaymentId();
    if (
      personPaymentId &&
      lastPayment &&
      personPaymentId !== lastPayment?.id.toString()
    ) {
      await removeLocalStorageItem(
        `HAS_CLOSED_FAILED_PAYMENT_NOTIFICATION${activePersonPaymentId}`,
      );
      await removeLocalStorageItem(
        `HAS_SEEN_FAILED_PAYMENT_NOTIFICATION_AGAIN${activePersonPaymentId}`,
      );
    }
  };

  const isNotificationVisible = async () => {
    const hasClosed = await hasClosedNotification();
    const hasSeenAgain = await hasSeenNotificationAgain();

    return !hasClosed || !hasSeenAgain;
  };

  const handleCloseNotificationClick = async () => {
    if (!lastPayment) return;
    await setLocalStorageItem(
      LAST_PERSON_PAYMENT_ID_KEY,
      lastPayment.id.toString(),
    );
    await setLocalStorageItem(
      HAS_CLOSED_FAILED_PAYMENT_NOTIFICATION_KEY,
      "true",
    );
    setVisible(false);
  };

  useEffect(() => {
    refetchSubscription();
    removeOldKeys();
    if (isClubPaymentFailed) {
      isNotificationVisible().then(async (isVisible) => {
        setVisible(isVisible);
        const hasClosed = await hasClosedNotification();
        if (isVisible && hasClosed) {
          await setLocalStorageItem(
            HAS_SEEN_FAILED_PAYMENT_NOTIFICATION_AGAIN_KEY,
            "true",
          );
        }
      });
    } else {
      setVisible(false);
    }
  }, [lastPayment, subscriptions]);

  const paymentFailedNotificationObject: IPaymentFailedNotificationContext =
    useMemo(
      () => ({
        visible,
        setVisible,
        handleCloseNotificationClick,
      }),
      [visible, setVisible],
    );

  return (
    <PaymentFailedNotificationContext.Provider
      value={paymentFailedNotificationObject}
    >
      {children}
    </PaymentFailedNotificationContext.Provider>
  );
}

export default PaymentFailedNotificationProvider;

export const usePaymentFailedNotification = () => {
  const context = useContext(PaymentFailedNotificationContext);

  if (!context) {
    throw new Error(
      "usePaymentFailedNotification must be used within PaymentFailedNotificationProvider",
    );
  }

  return context;
};
