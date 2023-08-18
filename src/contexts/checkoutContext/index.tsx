import { createContext, useContext, useMemo, useState } from "react";
import { Currencies } from "types/enums/Currencies";

export interface ICheckoutContext {
  target?: string;
  targetId?: string;
  offerPrice?: number;
  currency: Currencies;
  setTarget: (target: string) => void;
  setTargetId: (targetId: string) => void;
  setOfferPrice: (offerPrice: number) => void;
  setCurrency: (currency: Currencies) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CheckoutContext = createContext<ICheckoutContext>(
  {} as ICheckoutContext,
);

function CheckoutProvider({ children }: Props) {
  const [target, setTarget] = useState<string>();
  const [targetId, setTargetId] = useState<string>();
  const [offerPrice, setOfferPrice] = useState<number>();
  const [currency, setCurrency] = useState<Currencies>(Currencies.USD);

  const checkoutObject: ICheckoutContext = useMemo(
    () => ({
      target,
      targetId,
      offerPrice,
      currency,
      setTarget,
      setTargetId,
      setOfferPrice,
      setCurrency,
    }),
    [target, targetId, offerPrice, currency],
  );

  return (
    <CheckoutContext.Provider value={checkoutObject}>
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutProvider;

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  return context;
};
