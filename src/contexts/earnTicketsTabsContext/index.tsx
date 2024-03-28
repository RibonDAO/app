import {
  createContext,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface IEarnTicketsTabsContext {
  index: number;
  setIndex: (id: SetStateAction<number>) => void;
}

export const EarnTicketsTabsContext = createContext<IEarnTicketsTabsContext>(
  {} as IEarnTicketsTabsContext,
);

function EarnTicketsTabsProvider({ children }: any) {
  const [index, setIndex] = useState(0);

  const tabsObject: IEarnTicketsTabsContext = useMemo(
    () => ({
      index,
      setIndex,
    }),
    [index],
  );

  return (
    <EarnTicketsTabsContext.Provider value={tabsObject}>
      {children}
    </EarnTicketsTabsContext.Provider>
  );
}

export default EarnTicketsTabsProvider;

export function useEarnTicketsTabsContext() {
  const context = useContext(EarnTicketsTabsContext);

  if (!context) {
    throw new Error(
      "useEarnTicketsTabsContext must be used within a EarnTicketsTabsProvider",
    );
  }

  return context;
}
