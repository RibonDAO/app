import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { networks, validNetwork } from "config/networks";
import { logError } from "services/crashReport";
import { useProvider } from "hooks/useProvider";
import { CurrentNetwork } from "@ribon.io/shared/types";

export interface INetworkContext {
  isValidNetwork: boolean;
  setIsValidNetwork: (isValidNetwork: boolean) => void;
  currentNetwork: CurrentNetwork;
  getCurrentNetwork: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const NetworkContext = createContext<INetworkContext>(
  {} as INetworkContext,
);

function NetworkProvider({ children }: Props) {
  const [currentNetwork, setCurrentNetwork] = useState(networks[0]);
  const [isValidNetwork, setIsValidNetwork] = useState(false);

  const onChainChanged = (chainId: number) => {
    if (validNetwork(chainId)) {
      const newNetwork = networks.find(
        (network) => network.chainId.toString() === chainId.toString(),
      );
      setCurrentNetwork(newNetwork || networks[0]);
      setIsValidNetwork(true);
    } else {
      setCurrentNetwork(networks[0]);
      setIsValidNetwork(false);
    }
  };
  const provider = useProvider({ onChainChanged });

  const getCurrentNetwork = useCallback(async () => {
    try {
      const providerNetwork = await provider?.getNetwork();
      if (providerNetwork) {
        const permittedNetworks = networks.filter(
          (network) => providerNetwork.chainId === network.chainId,
        );
        if (permittedNetworks.length > 0) {
          setCurrentNetwork(permittedNetworks[0]);
          setIsValidNetwork(true);
        } else {
          setCurrentNetwork(networks[0]);
          setIsValidNetwork(false);
        }
      }
    } catch (e) {
      logError(e);
    }
  }, [provider]);

  useEffect(() => {
    getCurrentNetwork();
  }, [getCurrentNetwork]);

  const networkObject: INetworkContext = useMemo(
    () => ({
      currentNetwork: currentNetwork as CurrentNetwork,
      isValidNetwork,
      getCurrentNetwork,
      setIsValidNetwork,
    }),
    [currentNetwork, isValidNetwork],
  );

  return (
    <NetworkContext.Provider value={networkObject}>
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkProvider;

export const useNetworkContext = () => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used within NetworkProvider");
  }

  return context;
};
