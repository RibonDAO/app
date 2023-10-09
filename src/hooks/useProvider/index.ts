import { useEffect, useState } from "react";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

type Props = {
  onChainChanged?: (chainId: number) => void;
};
export function useProvider({ onChainChanged }: Props = {}) {
  const { provider, isConnected } = useWalletConnectModal();
  const [client, setClient] = useState<Web3Provider>();

  useEffect(() => {
    if (isConnected && provider) {
      const newClient = new ethers.providers.Web3Provider(provider);

      setClient(newClient);
    }
  }, [isConnected, provider]);

  useEffect(() => {
    if (provider?.on) {
      (provider?.on as any)("chainChanged", (chainId: number) => {
        onChainChanged?.(chainId);
      });
    }
  }, [provider]);

  return client;
}
