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
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { showToast } from "lib/Toast";

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

  const connector = useWalletConnect();

  useEffect(() => {
    if (connector.accounts && connector.accounts[0])
      setWallet(connector.accounts[0]);
  }, [connector]);

  const connectWallet = useCallback(async () => {
    try {
      const connectorRequest = await connector.connect();
      setWallet(connectorRequest.accounts[0]);
    } catch (error) {
      showToast(t("walletConnectionErrorMessage"));
    }
  }, [connector]);

  const killSession = useCallback(async () => {
    await connector.killSession();
    setWallet(null);
  }, [connector]);

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
