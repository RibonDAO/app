import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTickets } from "@ribon.io/shared/hooks";
import { useAuthentication } from "contexts/authenticationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useIntegrationContext } from "contexts/integrationContext";
import { logError } from "services/crashReport";

export interface ITicketsContext {
  ticketsCounter: number;
  setTicketsCounter: (tickets: number) => void;
  refetchTickets: () => void;
  hasTickets: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const TicketsContext = createContext<ITicketsContext>(
  {} as ITicketsContext,
);

function TicketsProvider({ children }: Props) {
  const { ticketsAvailable } = useTickets();
  const { tickets: userTickets, refetch } = ticketsAvailable();
  const { currentIntegrationId } = useIntegrationContext();
  const { isAuthenticated } = useAuthentication();
  const { currentUser } = useCurrentUser();
  const [ticketsCounter, setTicketsCounter] = useState<number>(1);

  const hasTickets = ticketsCounter > 0;

  function updateTicketsCounterForLoggedInUser() {
    if (userTickets !== undefined) {
      setTicketsCounter(userTickets);
    }
  }
  function updateTicketsCounterForNotLoggedInUser() {
    try {
      if (!currentUser) {
        setTicketsCounter(1);
      } else if (userTickets !== undefined) {
        setTicketsCounter(userTickets);
      }
    } catch (error) {
      logError(error);
    }
  }

  useEffect(() => {
    updateTicketsCounterForLoggedInUser();
  }, [userTickets]);

  useEffect(() => {
    refetch();
    updateTicketsCounterForNotLoggedInUser();
  }, [currentUser, userTickets]);

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      ticketsCounter,
      setTicketsCounter,
      hasTickets,
      refetchTickets: refetch,
    }),
    [ticketsCounter, currentIntegrationId, isAuthenticated, userTickets],
  );

  return (
    <TicketsContext.Provider value={ticketsObject}>
      {children}
    </TicketsContext.Provider>
  );
}

export default TicketsProvider;

export const useTicketsContext = () => {
  const context = useContext(TicketsContext);

  if (!context) {
    throw new Error("useTicketsContext must be used within TicketsProvider");
  }

  return context;
};
