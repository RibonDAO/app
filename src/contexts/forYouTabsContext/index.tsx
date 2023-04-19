import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface IForYouTabsContext {
  index: number;
  setIndex: (id: SetStateAction<number>) => void;
}

export const ForYouTabsContext = createContext<IForYouTabsContext>(
  {} as IForYouTabsContext,
);

function ForYouTabsProvider({ children }: any) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log("index", index);
  }, [index]);

  const tabsObject: IForYouTabsContext = useMemo(
    () => ({
      index,
      setIndex,
    }),
    [index],
  );

  return (
    <ForYouTabsContext.Provider value={tabsObject}>
      {children}
    </ForYouTabsContext.Provider>
  );
}

export default ForYouTabsProvider;

export function useForYouTabsContext() {
  const context = useContext(ForYouTabsContext);

  if (!context) {
    throw new Error(
      "useForYouTabsContext must be used within a ForYouTabsProvider",
    );
  }

  return context;
}
