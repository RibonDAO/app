import { createContext, useContext, useMemo, useState } from "react";
import { StripeProvider as ReactNativeStripeProvider } from "@stripe/stripe-react-native";
import {
  STRIPE_GLOBAL_PUBLISHABLE_KEY,
  STRIPE_PUBLISHABLE_KEY,
} from "utils/constants/Application";

export interface IStripeContext {
  changePublishableKey: (gateway: string) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const StripeContext = createContext<IStripeContext>(
  {} as IStripeContext,
);

function StripeProvider({ children }: Props) {
  const [publishableKey, setPublishableKey] = useState(
    STRIPE_GLOBAL_PUBLISHABLE_KEY,
  );
  const urlScheme = "ribon";
  const merchantIdentifier = "merchant.ribon.app";

  const changePublishableKey = (gateway: string) => {
    if (gateway === "stripe") {
      setPublishableKey(STRIPE_PUBLISHABLE_KEY);
      return;
    }

    setPublishableKey(STRIPE_GLOBAL_PUBLISHABLE_KEY);
  };

  const stripeObject: IStripeContext = useMemo(
    () => ({
      changePublishableKey,
    }),
    [],
  );

  return (
    <StripeContext.Provider value={stripeObject}>
      <ReactNativeStripeProvider
        publishableKey={publishableKey}
        urlScheme={urlScheme}
        merchantIdentifier={merchantIdentifier}
      >
        {children}
      </ReactNativeStripeProvider>
    </StripeContext.Provider>
  );
}

export default StripeProvider;

export const useStripeContext = () => {
  const context = useContext(StripeContext);

  if (!context) {
    throw new Error("useStripe must be used within StripeProvider");
  }

  return context;
};
