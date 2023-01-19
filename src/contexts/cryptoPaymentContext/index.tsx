import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import { Cause } from "@ribon.io/shared/types";
import { useNetworkContext } from "contexts/networkContext";
import RibonAbi from "utils/abis/RibonAbi.json";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useContract } from "hooks/useContract";
import {
  formatFromDecimals,
  formatToDecimals,
} from "lib/web3Helpers/etherFormatters";
import { stringToNumber } from "lib/formatters/stringToNumberFormatter";
import useTokenDecimals from "hooks/useTokenDecimals";
import { useWalletContext } from "contexts/walletContext";
import { BigNumber, utils } from "ethers";
import { showToast } from "lib/Toast";

export type onDonationToContractSuccessProps = (
  hash: string,
  timestamp: number,
  amountDonated: BigNumber,
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
  loading?: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CryptoPaymentContext = createContext<ICryptoPaymentContext>(
  {} as ICryptoPaymentContext,
);

function CryptoPaymentProvider({ children }: Props) {
  const { currentNetwork } = useNetworkContext();
  const [amount, setAmount] = useState("5.0");
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("");
  const [cause, setCause] = useState<Cause>();
  const [currentPool, setCurrentPool] = useState(
    currentNetwork.defaultPoolAddress,
  );
  const [tokenSymbol, setTokenSymbol] = useState("");
  const { tokenDecimals } = useTokenDecimals();
  const { wallet } = useWalletContext();

  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });
  const donationTokenContract = useContract({
    address: currentNetwork.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
  });

  const approveAmount = async () =>
    donationTokenContract?.functions.approve(
      currentNetwork.ribonContractAddress,
      formatToDecimals(amount, tokenDecimals).toString(),
      {
        from: wallet,
      },
    );

  const donateToContract = async () =>
    contract?.functions.addPoolBalance(
      currentPool,
      formatToDecimals(amount, tokenDecimals).toString(),
    );

  const fetchUsdcUserBalance = useCallback(async () => {
    try {
      const balance = await donationTokenContract?.balanceOf(wallet);
      const formattedBalance = formatFromDecimals(balance, tokenDecimals);

      setUserBalance(formattedBalance.toString());
    } catch (error) {
      logError(error);
    }
  }, [wallet, tokenDecimals]);

  useEffect(() => {
    if (wallet) fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  const insufficientBalance = () => {
    console.log("userBalance", userBalance);
    console.log("amount", amount);
    const amountNumber = stringToNumber(amount);
    const userBalanceNumber = stringToNumber(userBalance);

    return amountNumber > userBalanceNumber;
  };

  const disableButton = () =>
    amount === "0.00" || insufficientBalance() || loading;

  const handleDonationToContract = async (
    onSuccess?: onDonationToContractSuccessProps,
  ) => {
    try {
      setLoading(true);
      const approval = await approveAmount();
      showToast("Waiting for approval");
      await approval.wait();
      const response = await donateToContract();

      const { hash } = response;
      const timestamp = Math.floor(new Date().getTime() / 1000);

      if (onSuccess) onSuccess(hash, timestamp, utils.parseEther(amount));
    } catch (error) {
      logEvent("toastNotification_view", {
        status: "transactionFailed",
      });
      logError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenSymbol = useCallback(async () => {
    const contractSymbol = await donationTokenContract?.functions.symbol();
    setTokenSymbol(contractSymbol);
  }, [donationTokenContract]);

  useEffect(() => {
    fetchTokenSymbol();
  }, [fetchTokenSymbol]);

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
      loading,
    }),
    [amount, currentPool, userBalance, tokenSymbol, loading, cause],
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
