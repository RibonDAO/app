import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract } from "utils/contractUtils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { logError } from "services/crashReport";
import { useNetworkContext } from "contexts/networkContext";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

type Props = {
  address: string;
  ABI: any;
};

export function useContract<T extends Contract = Contract>({
  address,
  ABI,
}: Props): T | null {
  const { currentNetwork } = useNetworkContext();
  const connector = useWalletConnect();
  return useMemo(() => {
    if (!address || !ABI) return null;
    try {
      const provider = new JsonRpcProvider(currentNetwork.nodeUrl);

      return getContract(address, ABI, provider);
    } catch (error) {
      logError(error);
      return null;
    }
  }, [address, ABI]) as T;
}
