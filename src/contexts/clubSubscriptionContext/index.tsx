import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSubscriptions } from "@ribon.io/shared";
import Subscription from "@ribon.io/shared/types/entities/Subscription";

export interface IClubSubscriptionContext {
  clubSubscription: Subscription | undefined;
  refetch: () => void;
}

export const ClubSubscriptionContext = createContext<IClubSubscriptionContext>(
  {} as IClubSubscriptionContext,
);
ClubSubscriptionContext.displayName = "ClubSubscriptionContext";

function ClubSubscriptionProvider({ children }: any) {
  const [clubSubscription, setClubSubscription] = useState<
    Subscription | undefined
  >();
  const { userSubscriptions } = useSubscriptions();
  const { subscriptions, refetch } = userSubscriptions();

  useEffect(() => {
    if (subscriptions && subscriptions.length > 0) {
      const checkClubSubscription = subscriptions?.filter(
        (subscription) => subscription.offer?.category === "club",
      );

      if (checkClubSubscription)
        setClubSubscription(
          checkClubSubscription[checkClubSubscription.length - 1],
        );
    }
  }, [subscriptions]);

  const clubSubscriptionObject: IClubSubscriptionContext = useMemo(
    () => ({
      clubSubscription,
      setClubSubscription,
      refetch,
    }),
    [clubSubscription, refetch],
  );

  return (
    <ClubSubscriptionContext.Provider value={clubSubscriptionObject}>
      {children}
    </ClubSubscriptionContext.Provider>
  );
}

export default ClubSubscriptionProvider;

export function useClubSubscriptionContext() {
  const context = useContext(ClubSubscriptionContext);

  if (!context) {
    throw new Error(
      "useClubSubscriptionContext must be used within a ClubSubscriptionProvider",
    );
  }

  return context;
}
