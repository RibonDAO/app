import { useEffect, useState } from "react";
import { logError } from "services/crashReport";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

export function useProvider() {
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);
  const connector = useWalletConnect();

  async function fetchProvider() {
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
    fetchProvider();
  }, []);

  return provider;
}
