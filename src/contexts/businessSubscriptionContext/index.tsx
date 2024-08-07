import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Subscription from "@ribon.io/shared/types/entities/Subscription";
import { useCurrentUser } from "contexts/currentUserContext";
import { Plan } from "@ribon.io/shared";

export interface IBusinessSubscriptionContext {
  businessSubscription: Subscription | undefined;
  businessPlan: Plan | undefined;
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
  const [businessPlan, setBusinessPlan] = useState<Plan | undefined>();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser?.directTransferSubscription) {
      setBusinessSubscription(currentUser.directTransferSubscription);
      setBusinessPlan(currentUser.directTransferSubscription.offer.plan);
    }
  }, [currentUser]);

  const BusinessSubscriptionObject: IBusinessSubscriptionContext = useMemo(
    () => ({
      businessSubscription,
      setBusinessSubscription,
      businessPlan,
      setBusinessPlan,
    }),
    [businessSubscription],
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
