import { useEffect, useState } from "react";
import { logError } from "services/crashReport";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useWalletContext } from "contexts/walletContext";
import { networks, validNetwork } from "config/networks";

type Props = {
  onChainChanged?: (chainId: number) => void;
};
export function useProvider({ onChainChanged }: Props = {}) {
  const { wallet } = useWalletContext();
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const connector = useWalletConnect();

  async function fetchProvider() {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          [networks[0].chainId]: networks[0].nodeUrl,
          [networks[1].chainId]: networks[1].nodeUrl,
          [networks[2].chainId]: networks[2].nodeUrl,
        },
        connector,
        qrcode: false,
      });

      await walletConnectProvider.enable();
      const web3Provider = new providers.Web3Provider(walletConnectProvider);
      setProvider(web3Provider);
    } catch (e) {
      logError(e);
    }
  }

  useEffect(() => {
    connector.on("session_update", (error, payload) => {
      if (error) {
        logError(error);
      }
      const chainId = payload?.params[0].chainId;
      if (validNetwork(chainId)) {
        fetchProvider();
      } else {
        setProvider(null);
      }
      if (onChainChanged) onChainChanged(chainId);
    });
  }, []);

  useEffect(() => {
    if (wallet && validNetwork(connector.chainId)) {
      fetchProvider();
    }
  }, [wallet, connector.chainId]);

  return provider;
}
