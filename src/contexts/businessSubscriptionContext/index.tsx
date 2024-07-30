import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSubscriptions } from "@ribon.io/shared";
import Subscription from "@ribon.io/shared/types/entities/Subscription";

export interface IBusinessSubscriptionContext {
  businessSubscription: Subscription | undefined;
  refetch: () => void;
}

export const BusinessSubscriptionContext =
  createContext<IBusinessSubscriptionContext>(
    {} as IBusinessSubscriptionContext,
  );
BusinessSubscriptionContext.displayName = "BusinessSubscriptionContext";

function BusinessSubscriptionProvider({ children }: any) {
  const [businessSubscription, setBusinessSubscription] = useState<
    Subscription | undefined
  >();
  const { userSubscriptions } = useSubscriptions();
  const { subscriptions, refetch } = userSubscriptions();

  useEffect(() => {
    //   if (subscriptions && subscriptions.length > 0) {
    //     const checkBusinessSubscription = subscriptions?.filter(
    //       (subscription) => subscription.offer?.category === "business",
    //     );
    //     if (checkBusinessSubscription)
    //       setBusinessSubscription(
    //         checkBusinessSubscription[checkBusinessSubscription.length - 1],
    //       );
    //   }
  }, [subscriptions]);

  const BusinessSubscriptionObject: IBusinessSubscriptionContext = useMemo(
    () => ({
      businessSubscription,
      setBusinessSubscription,
      refetch,
    }),
    [businessSubscription, refetch],
  );

  return (
    <BusinessSubscriptionContext.Provider value={BusinessSubscriptionObject}>
      {children}
    </BusinessSubscriptionContext.Provider>
  );
}

export default BusinessSubscriptionProvider;

export function useBusinessSubscriptionContext() {
  const context = useContext(BusinessSubscriptionContext);

  if (!context) {
    throw new Error(
      "useBusinessSubscriptionContext must be used within a BusinessSubscriptionProvider",
    );
  }

  return context;
}
