import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUserTickets, useTickets } from "@ribon.io/shared/hooks";
import { useAuthentication } from "contexts/authenticationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { PLATFORM } from "utils/constants/Application";
import { useIntegrationContext } from "contexts/integrationContext";

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
  const { ticketsAvailable } = useUserTickets();
  const { tickets: userTickets, refetch } = ticketsAvailable();
  const { currentIntegrationId } = useIntegrationContext();
  const { isAuthenticated } = useAuthentication();
  const { currentUser } = useCurrentUser();
  const [ticketsCounter, setTicketsCounter] = useState<number>(1);
  const { canCollectByIntegration } = useTickets();

  const hasTickets = ticketsCounter > 0;

  async function hasTicketToCollect() {
    const { canCollect } = await canCollectByIntegration(
      currentIntegrationId ?? "",
      currentUser?.email ?? "",
      PLATFORM,
    );

    if (!isAuthenticated()) {
      if (!canCollect) {
        setTicketsCounter(0);
      } else {
        setTicketsCounter(1);
      }
    }
  }

  useEffect(() => {
    refetch();
    hasTicketToCollect();
  }, [isAuthenticated, currentIntegrationId, currentUser]);

  useEffect(() => {
    if (userTickets !== undefined) {
      setTicketsCounter(userTickets);
    }
  }, [userTickets]);

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      ticketsCounter,
      setTicketsCounter,
      hasTickets,
      refetchTickets: refetch,
    }),
    [ticketsCounter],
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
