import {
  Cause,
  getLocalStorageItem,
  Languages,
  NonProfit,
  Offer,
  setLocalStorageItem,
} from "@ribon.io/shared";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "contexts/languageContext";
import { coinByLanguage } from "lib/coinByLanguage";
import { countryByLanguage } from "lib/countryByLanguage";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  nonProfit?: NonProfit;
  cause?: Cause;
  loading: boolean;
  setLoading: (value: boolean) => void;
  resetStates: () => void;
  setCurrentCoin: (value: SetStateAction<Currencies | undefined>) => void;
  setCountry: (value: SetStateAction<string>) => void;
  setState: (value: SetStateAction<string>) => void;
  setCity: (value: SetStateAction<string>) => void;
  setTaxId: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string | undefined>) => void;
  setNumber: (value: SetStateAction<string>) => void;
  setName: (value: SetStateAction<string>) => void;
  setExpirationDate: (value: SetStateAction<string>) => void;
  setCvv: (value: SetStateAction<string>) => void;
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  setCryptoGiving: (value: SetStateAction<string>) => void;
  setOffer: (value: SetStateAction<Offer | undefined>) => void;
  setFlow: (
    value: SetStateAction<"cause" | "nonProfit" | "club" | undefined>,
  ) => void;
  buttonDisabled: boolean;
  currentCoin?: Currencies;
  country: string;
  state: string;
  city: string;
  taxId: string;
  email: string | undefined;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
  cryptoGiving: string;
  offer: Offer | undefined;
  flow: "cause" | "nonProfit" | "club" | undefined;

  setCause: (value: SetStateAction<Cause | undefined>) => void;

  setNonProfit: (value: SetStateAction<NonProfit | undefined>) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CheckoutContext = createContext<ICheckoutContext>(
  {} as ICheckoutContext,
);

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";

function CheckoutProvider({ children }: Props) {
  const [target, setTarget] = useState<string>();
  const [targetId, setTargetId] = useState<string>();
  const [offerPrice, setOfferPrice] = useState<number>();
  const [currency, setCurrency] = useState<Currencies>(Currencies.USD);

  const { currentLang } = useLanguage();
  const currentContry = countryByLanguage(currentLang);
  const { currentUser } = useCurrentUser();

  const [offer, setOffer] = useState<Offer | undefined>();
  const [nonProfit, setNonProfit] = useState<NonProfit | undefined>();
  const [cause, setCause] = useState<Cause | undefined>();
  const [flow, setFlow] = useState<
    "cause" | "nonProfit" | "club" | undefined
  >();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [currentCoin, setCurrentCoin] = useState<Currencies>();

  const defaultCoin = async () =>
    ((await getLocalStorageItem(CURRENT_COIN_KEY)) as Currencies) ||
    coinByLanguage(currentLang as Languages);

  useEffect(() => {
    async function setDefaultCoin() {
      try {
        setLoading(true);
        const coin = await defaultCoin();
        setCurrentCoin(coin);
      } finally {
        setLoading(false);
      }
    }

    setDefaultCoin();
  }, []);

  useEffect(() => {
    if (currentCoin) setLocalStorageItem(CURRENT_COIN_KEY, currentCoin);
  }, [currentCoin]);

  const [country, setCountry] = useState(currentContry);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState(currentUser?.email ?? undefined);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cryptoGiving, setCryptoGiving] = useState("");

  const resetStates = () => {
    setCountry("");
    setEmail(currentUser?.email ?? undefined);
    setState("");
    setCity("");
    setTaxId("");
    setNumber("");
    setName("");
    setExpirationDate("");
    setCvv("");
    setButtonDisabled(true);
  };

  useEffect(() => {
    if (currentUser) setEmail(currentUser.email);
  }, [JSON.stringify(currentUser)]);

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
      setOffer,
      setNonProfit,
      setCause,
      setFlow,
      buttonDisabled,
      setButtonDisabled,
      offer,
      nonProfit,
      cause,
      flow,
      loading,
      setLoading,
      currentCoin,
      setCurrentCoin,
      setCryptoGiving,
      cryptoGiving,
      country,
      state,
      city,
      taxId,
      email,
      number,
      name,
      expirationDate,
      cvv,
      resetStates,
      setCountry,
      setState,
      setCity,
      setTaxId,
      setEmail,
      setNumber,
      setName,
      setExpirationDate,
      setCvv,
    }),
    [
      target,
      targetId,
      offerPrice,
      currency,
      currentCoin,
      offer,
      country,
      city,
      state,
      taxId,
      email,
      number,
      name,
      expirationDate,
      cvv,
      buttonDisabled,
      cause,
      nonProfit,
      flow,
      loading,
    ],
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
