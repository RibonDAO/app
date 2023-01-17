import { createContext, useContext, useMemo, useState } from "react";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import { Cause } from "@ribon.io/shared/types";

export type onDonationToContractSuccessProps = (
  hash: string,
  timestamp: number,
  amountDonated: number,
) => void;

export interface ICryptoPaymentContext {
  handleDonationToContract: (
    onSuccess?: onDonationToContractSuccessProps,
  ) => Promise<void>;
  disableButton: () => boolean;
  amount: string;
  setAmount: (amount: string) => void;
  insufficientBalance: () => boolean;
  currentPool: string;
  setCurrentPool: (pool: string) => void;
  userBalance: string;
  tokenSymbol: string;
  cause?: Cause;
  setCause: (cause: Cause) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CryptoPaymentContext = createContext<ICryptoPaymentContext>(
  {} as ICryptoPaymentContext,
);

function CryptoPaymentProvider({ children }: Props) {
  const currentNetwork = {
    defaultPoolAddress: "0x0",
    donationTokenContractAddress: "0x0",
  };
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userBalance] = useState("");
  const [cause, setCause] = useState<Cause>();
  const [currentPool, setCurrentPool] = useState(
    currentNetwork.defaultPoolAddress,
  );
  const [tokenSymbol] = useState("");

  const insufficientBalance = () => true;

  const disableButton = () =>
    amount === "0.00" || insufficientBalance() || loading;

  const handleDonationToContract = async (
    onSuccess?: onDonationToContractSuccessProps,
  ) => {
    setLoading(true);

    try {
      console.log(onSuccess);
    } catch (error) {
      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
      logError(error);
    } finally {
      setLoading(false);
    }
  };

  const cryptoPaymentObject: ICryptoPaymentContext = useMemo(
    () => ({
      handleDonationToContract,
      disableButton,
      amount,
      setAmount,
      insufficientBalance,
      currentPool,
      setCurrentPool,
      userBalance,
      tokenSymbol,
      cause,
      setCause,
    }),
    [amount, currentPool, userBalance, tokenSymbol],
  );

  return (
    <CryptoPaymentContext.Provider value={cryptoPaymentObject}>
      {children}
    </CryptoPaymentContext.Provider>
  );
}

export default CryptoPaymentProvider;

export const useCryptoPayment = () => {
  const context = useContext(CryptoPaymentContext);

  if (!context) {
    throw new Error(
      "useCryptoPayment must be used within CryptoPaymentProvider",
    );
  }

  return context;
};
