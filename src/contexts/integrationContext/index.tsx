import { useIntegration } from "@ribon.io/shared/hooks";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Integration } from "@ribon.io/shared/types";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export interface IIntegrationContext {
  integration?: Integration;
  currentIntegrationId: string | number;
  setCurrentIntegrationId: (id: SetStateAction<string>) => void;
  externalId: string | undefined;
  setExternalId: (id: SetStateAction<string | undefined>) => void;
  refetch: () => void;
}

export const IntegrationContext = createContext<IIntegrationContext>(
  {} as IIntegrationContext,
);

function IntegrationProvider({ children }: any) {
  const [currentIntegrationId, setCurrentIntegrationId] =
    useState(RIBON_INTEGRATION_ID);
  const [externalId, setExternalId] = useState<string>();
  const { integration, refetch } = useIntegration(currentIntegrationId);

  useEffect(() => {
    if (currentIntegrationId) {
      refetch();
    }
  }, [currentIntegrationId]);

  const IntegrationObject: IIntegrationContext = useMemo(
    () => ({
      integration,
      refetch,
      externalId,
      currentIntegrationId,
      setCurrentIntegrationId,
      setExternalId,
    }),
    [integration, currentIntegrationId, externalId],
  );

  return (
    <IntegrationContext.Provider value={IntegrationObject}>
      {children}
    </IntegrationContext.Provider>
  );
}

export default IntegrationProvider;

export function useIntegrationContext() {
  const context = useContext(IntegrationContext);

  if (!context) {
    throw new Error(
      "useIntegrationContext must be used within a IntegrationProvider",
    );
  }

  return context;
}
