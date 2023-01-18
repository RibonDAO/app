import { useEffect, useState } from "react";
import { logError } from "services/crashReport";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useWalletContext } from "contexts/walletContext";

export function useProvider() {
  const { wallet } = useWalletContext();
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const connector = useWalletConnect();

  async function fetchProvider() {
    console.log("fetch provider called");
    try {
      const walletConnectProvider = new WalletConnectProvider({
        rpc: {
          80001:
            "https://polygon-mumbai.g.alchemy.com/v2/9G3Z4VFJG7ni_BDJ9hDqoWZw_K7vMSFC",
        },
        chainId: 80001,
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
    if (wallet) {
      fetchProvider();
    }
  }, [wallet]);

  return provider;
}
