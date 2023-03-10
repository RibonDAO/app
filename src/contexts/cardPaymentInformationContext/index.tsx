import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "contexts/languageContext";
import { coinByLanguage } from "lib/coinByLanguage";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { logError } from "services/crashReport";
import { creditCardPaymentApi } from "@ribon.io/shared/services";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import {
  Cause,
  Currencies,
  Languages,
  NonProfit,
} from "@ribon.io/shared/types";
import { showToast } from "lib/Toast";
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { useNavigation } from "hooks/useNavigation";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export interface ICardPaymentInformationContext {
  setCurrentCoin: (value: SetStateAction<Currencies | undefined>) => void;
  setCountry: (value: SetStateAction<string>) => void;
  setState: (value: SetStateAction<string>) => void;
  setCity: (value: SetStateAction<string>) => void;
  setTaxId: (value: SetStateAction<string>) => void;
  setEmail: (value: SetStateAction<string>) => void;
  setNumber: (value: SetStateAction<string>) => void;
  setName: (value: SetStateAction<string>) => void;
  setExpirationDate: (value: SetStateAction<string>) => void;
  setCvv: (value: SetStateAction<string>) => void;
  setButtonDisabled: (value: SetStateAction<boolean>) => void;
  setCryptoGiving: (value: SetStateAction<string>) => void;
  setOfferId: (value: SetStateAction<number>) => void;
  setFlow: (value: SetStateAction<"cause" | "nonProfit">) => void;
  buttonDisabled: boolean;
  currentCoin?: Currencies;
  country: string;
  state: string;
  city: string;
  taxId: string;
  email: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
  cryptoGiving: string;
  offerId: number;
  flow: "cause" | "nonProfit";
  handleSubmit: () => void;
  cause: Cause | undefined;
  setCause: (value: SetStateAction<Cause | undefined>) => void;
  nonProfit: NonProfit | undefined;
  setNonProfit: (value: SetStateAction<NonProfit | undefined>) => void;
  loading: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CardPaymentInformationContext =
  createContext<ICardPaymentInformationContext>(
    {} as ICardPaymentInformationContext,
  );

export const CURRENT_COIN_KEY = "CURRENT_COIN_KEY";

function CardPaymentInformationProvider({ children }: Props) {
  const { currentUser } = useCurrentUser();
  const { currentLang } = useLanguage();
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
      } catch (error) {
        logError(error);
      } finally {
        setLoading(false);
      }
    }

    setDefaultCoin();
  }, []);

  useEffect(() => {
    if (currentCoin) setLocalStorageItem(CURRENT_COIN_KEY, currentCoin);
  }, [currentCoin]);

  const integrationId = RIBON_INTEGRATION_ID;

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cryptoGiving, setCryptoGiving] = useState("");
  const [offerId, setOfferId] = useState(0);
  const [cause, setCause] = useState<Cause>();
  const [nonProfit, setNonProfit] = useState<NonProfit>();
  const [flow, setFlow] = useState<"nonProfit" | "cause">("nonProfit");
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.cardPaymentInformation",
  });

  // const { navigateTo } = useNavigation();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  const resetStates = () => {
    setCountry("");
    setState("");
    setCity("");
    setTaxId("");
    setNumber("");
    setName("");
    setExpirationDate("");
    setCvv("");
    setButtonDisabled(false);
  };

  const handleSubmit = async () => {
    logEvent("treasureSupportConfirmBtn_click");
    showLoadingOverlay();

    const expiration = expirationDate.split("/");

    const paymentInformation = {
      email,
      country,
      state,
      city,
      taxId,
      offerId,
      integrationId: integrationId ?? 1,
      card: {
        number: number.replace(/\D/g, "").slice(0, 16),
        name,
        expirationMonth: expiration[0],
        expirationYear: expiration[1].slice(-2),
        cvv,
      },
      causeId: cause?.id,
      nonProfitId: nonProfit?.id,
    };

    try {
      await creditCardPaymentApi.postCreditCardPayment(paymentInformation);
      navigateTo("ContributionDoneScreen", {
        cause,
        nonProfit,
      });
      logEvent("treasureGivingConfirmMdl_view");
      resetStates();
    } catch (error) {
      logError(error);
      showToast(t("onErrorMessage"));

      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
    } finally {
      hideLoadingOverlay();
    }
  };

  const cardPaymentInformationObject: ICardPaymentInformationContext = useMemo(
    () => ({
      currentCoin,
      setCurrentCoin,
      country,
      setCountry,
      city,
      setCity,
      state,
      setState,
      taxId,
      setTaxId,
      handleSubmit,
      setName,
      name,
      setNumber,
      number,
      setEmail,
      email,
      setExpirationDate,
      expirationDate,
      setCvv,
      cvv,
      buttonDisabled,
      setButtonDisabled,
      setCryptoGiving,
      cryptoGiving,
      setOfferId,
      offerId,
      cause,
      setCause,
      nonProfit,
      setNonProfit,
      flow,
      setFlow,
      loading,
    }),
    [
      currentCoin,
      offerId,
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
    <CardPaymentInformationContext.Provider
      value={cardPaymentInformationObject}
    >
      {children}
    </CardPaymentInformationContext.Provider>
  );
}

export default CardPaymentInformationProvider;

export const useCardPaymentInformation = () => {
  const context = useContext(CardPaymentInformationContext);

  if (!context) {
    throw new Error(
      "useCardPaymentInformation must be used within CardPaymentInformationProvider",
    );
  }

  return context;
};
