import { createContext, useContext, useMemo, useState } from "react";

export interface IOnboardingContext {
  onboardingCompleted: boolean | undefined;
  setOnboardingCompleted: (status: boolean) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const OnboardingContext = createContext<IOnboardingContext>(
  {} as IOnboardingContext,
);

function OnboardingProvider({ children }: Props) {
  const [onboardingCompleted, setOnboardingCompleted] =
    useState<boolean>(false);

  const onboardingObject: IOnboardingContext = useMemo(
    () => ({
      onboardingCompleted,
      setOnboardingCompleted,
    }),
    [onboardingCompleted, setOnboardingCompleted],
  );

  return (
    <OnboardingContext.Provider value={onboardingObject}>
      {children}
    </OnboardingContext.Provider>
  );
}

export default OnboardingProvider;

export const useIsOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useIsOnboarding must be used within OnboardingProvider");
  }

  return context;
};
