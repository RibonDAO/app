import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { logError } from "services/crashReport";
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
import { useLoadingOverlay } from "contexts/loadingOverlayContext";
import { useTranslation } from "react-i18next";

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
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isInCryptoPage: boolean;
  setIsInCryptoPage: (isInCryptoPage: boolean) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CryptoPaymentContext = createContext<ICryptoPaymentContext>(
  {} as ICryptoPaymentContext,
);

export const INITIAL_AMOUNT = "5";
function CryptoPaymentProvider({ children }: Props) {
  const [isInCryptoPage, setIsInCryptoPage] = useState(false);
  const { currentNetwork, isValidNetwork } = useNetworkContext();
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState("");
  const [cause, setCause] = useState<Cause>();
  const [currentPool, setCurrentPool] = useState(
    currentNetwork.defaultPoolAddress,
  );
  const [tokenSymbol, setTokenSymbol] = useState("");
  const { tokenDecimals } = useTokenDecimals();
  const { wallet } = useWalletContext();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

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
      { gasLimit: 50000 },
    );

  const fetchUsdcUserBalance = useCallback(async () => {
    try {
      const balance = await donationTokenContract?.balanceOf(wallet);
      const formattedBalance = formatFromDecimals(balance, tokenDecimals);

      setUserBalance(formattedBalance.toString());
    } catch (error) {
      logError(error);
    }
  }, [wallet, tokenDecimals, donationTokenContract?.address]);

  useEffect(() => {
    if (wallet) fetchUsdcUserBalance();
  }, [fetchUsdcUserBalance]);

  const insufficientBalance = () => {
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
      showLoadingOverlay(t("tokenAmountTransferMessage") || "");
      const approval = await approveAmount();
      await approval.wait();
      showLoadingOverlay(t("contractTransferMessage") || "");
      const response = await donateToContract();

      const { hash } = response;
      const timestamp = Math.floor(new Date().getTime() / 1000);

      if (onSuccess) onSuccess(hash, timestamp, utils.parseEther(amount));
    } catch (error) {
      logError(error);
    } finally {
      hideLoadingOverlay();
      setLoading(false);
    }
  };

  const fetchTokenSymbol = useCallback(async () => {
    const contractSymbol = await donationTokenContract?.functions.symbol();
    setTokenSymbol(contractSymbol);
  }, [donationTokenContract?.address]);

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
      setLoading,
      isInCryptoPage,
      setIsInCryptoPage,
    }),
    [
      amount,
      currentPool,
      userBalance,
      tokenSymbol,
      loading,
      cause,
      isInCryptoPage,
      setIsInCryptoPage,
      currentNetwork?.chainId,
    ],
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
