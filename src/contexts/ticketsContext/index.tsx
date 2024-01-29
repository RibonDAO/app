import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUserTickets } from "@ribon.io/shared/hooks";
import { useAuthentication } from "contexts/authenticationContext";

export interface ITicketsContext {
  ticketsCounter: number;
  setTicketsCounter: (tickets: number) => void;
  refetch: () => void;
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
  const { tickets, refetch } = ticketsAvailable();

  const { accessToken } = useAuthentication();
  const [ticketsCounter, setTicketsCounter] = useState(1);

  const hasTickets = ticketsCounter > 0;

  useEffect(() => {
    refetch();
    setTicketsCounter(tickets ?? 1);
    if (!accessToken) setTicketsCounter(1);
  }, [tickets, accessToken]);

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      ticketsCounter,
      setTicketsCounter,
      hasTickets,
      refetch,
    }),
    [tickets],
  );

  return (
    <TicketsContext.Provider value={ticketsObject}>
      {children}
    </TicketsContext.Provider>
  );
}

export default TicketsProvider;

export const useTickets = () => {
  const context = useContext(TicketsContext);

  if (!context) {
    throw new Error("useTickets must be used within TicketsProvider");
  }

  return context;
};
