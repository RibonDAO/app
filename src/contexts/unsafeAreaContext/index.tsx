import { createContext, useContext, useMemo, useState } from "react";

export interface IUnsafeAreaContext {
  topBackgroundColor: string;
  bottomBackgroundColor: string;
  setTopBackgroundColor: (color: string) => void;
  setBottomBackgroundColor: (color: string) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const UnsafeAreaContext = createContext<IUnsafeAreaContext>(
  {} as IUnsafeAreaContext,
);

function UnsafeAreaProvider({ children }: Props) {
  const [topBackgroundColor, setTopBackgroundColor] = useState("white");
  const [bottomBackgroundColor, setBottomBackgroundColor] = useState("white");

  const unsafeAreaObject: IUnsafeAreaContext = useMemo(
    () => ({
      topBackgroundColor,
      bottomBackgroundColor,
      setTopBackgroundColor,
      setBottomBackgroundColor,
    }),
    [topBackgroundColor, bottomBackgroundColor],
  );

  return (
    <UnsafeAreaContext.Provider value={unsafeAreaObject}>
      {children}
    </UnsafeAreaContext.Provider>
  );
}

export default UnsafeAreaProvider;

export const useUnsafeAreaContext = () => {
  const context = useContext(UnsafeAreaContext);

  if (!context) {
    throw new Error(
      "useUnsafeAreaContext must be used within UnsafeAreaProvider",
    );
  }

  return context;
};
