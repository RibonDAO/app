import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract } from "utils/contractUtils";
import { JsonRpcProvider } from "@ethersproject/providers";
import { logError } from "services/crashReport";
import { useNetworkContext } from "contexts/networkContext";
import { useProvider } from "hooks/useProvider";

type Props = {
  address: string;
  ABI: any;
};

export function useContract<T extends Contract = Contract>({
  address,
  ABI,
}: Props): T | null {
  const provider = useProvider();
  const { currentNetwork } = useNetworkContext();

  return useMemo(() => {
    if (!address || !ABI) return null;
    try {
      if (provider) return getContract(address, ABI, provider.getSigner());

      const providerJsonRpc = new JsonRpcProvider(currentNetwork.nodeUrl);

      return getContract(address, ABI, providerJsonRpc);
    } catch (error) {
      logError(error);
      return null;
    }
  }, [address, ABI, provider]) as T;
}
