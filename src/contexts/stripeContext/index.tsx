import { createContext, useContext } from "react";
import { StripeProvider as ReactNativeStripeProvider } from "@stripe/stripe-react-native";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStripeContext {}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const StripeContext = createContext<IStripeContext>(
  {} as IStripeContext,
);

function StripeProvider({ children }: Props) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const stripeObject: IStripeContext = {};
  const publishableKey =
    "pk_test_51JRgaRJuOnwQq9Qx2RrybIhE1vRgC5tNd32EJkINCTmgGZYSr3QXne9y5CAdEq36WULJPmWv2VvZZ0xA5MNTrY7C00KL9rq6Op";
  const urlScheme = "ribon";
  const merchantIdentifier = "merchant.ribon.app";

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

export const useStripe = () => {
  const context = useContext(StripeContext);

  if (!context) {
    throw new Error("useStripe must be used within StripeProvider");
  }

  return context;
};
