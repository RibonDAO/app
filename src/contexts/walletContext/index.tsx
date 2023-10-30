import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "lib/Toast";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { logError } from "services/crashReport";

export interface IWalletContext {
  wallet: string | null;
  connectWallet: () => void;
  setWallet: Dispatch<SetStateAction<string | null>>;
  killSession: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext,
);

function WalletProvider({ children }: Props) {
  const [wallet, setWallet] = useState<string | null>(null);
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.walletContext",
  });

  const { address, open, provider } = useWalletConnectModal();

  useEffect(() => {
    if (address) setWallet(address);
  }, [address]);

  const connectWallet = useCallback(async () => {
    try {
      await open();
    } catch (error) {
      showToast({
        type: "error",
        message: t("walletConnectionErrorMessage", "error"),
      });
    }
  }, [open]);

  const killSession = useCallback(async () => {
    try {
      await provider?.disconnect();
    } catch (e) {
      logError(e);
    }
    setWallet(null);
  }, []);

  const walletObject: IWalletContext = useMemo(
    () => ({
      wallet,
      connectWallet,
      setWallet,
      killSession,
    }),
    [wallet, connectWallet, killSession],
  );

  return (
    <WalletContext.Provider value={walletObject}>
      {children}
    </WalletContext.Provider>
  );
}

export default WalletProvider;

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }

  return context;
};
