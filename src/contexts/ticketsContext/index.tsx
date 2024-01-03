import { createContext, useContext, useMemo, useState } from "react";

export interface ITicketsContext {
  tickets: number;
  addTicket: (ticketsNumber?: number) => void;
  removeTicket: (ticketsNumber?: number) => void;
  setTickets: (tickets: number) => void;
  hasTickets: () => boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const TicketsContext = createContext<ITicketsContext>(
  {} as ITicketsContext,
);

function TicketsProvider({ children }: Props) {
  const [tickets, setTickets] = useState(0);

  const addTicket = (ticketsNumber = 1) => {
    setTickets(tickets + ticketsNumber);
  };

  const removeTicket = (ticketsNumber = 1) => {
    setTickets(tickets - ticketsNumber);
  };

  const hasTickets = () => tickets > 0;

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      tickets,
      addTicket,
      removeTicket,
      setTickets,
      hasTickets,
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
