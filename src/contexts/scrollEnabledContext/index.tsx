import { createContext, useContext, useState } from "react";

export interface IScrollEnabledContext {
  scrollEnabled: boolean;
  setScrollEnabled: (scrollEnabled: boolean) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const ScrollEnabledContext = createContext<IScrollEnabledContext>(
  {} as IScrollEnabledContext,
);

function ScrollEnabledProvider({ children }: Props) {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const scrollEnabledObject: IScrollEnabledContext = {
    scrollEnabled,
    setScrollEnabled,
  };

  return (
    <ScrollEnabledContext.Provider value={scrollEnabledObject}>
      {children}
    </ScrollEnabledContext.Provider>
  );
}

export default ScrollEnabledProvider;

export const useScrollEnabled = () => {
  const context = useContext(ScrollEnabledContext);

  if (!context) {
    throw new Error(
      "useScrollEnabled must be used within ScrollEnabledProvider",
    );
  }

  return context;
};
