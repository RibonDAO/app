import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export type Props = {
  onComeToForeground?(): void;
  onGoneToBackground?(): void;
};
export function useAppState({ onComeToForeground, onGoneToBackground }: Props) {
  const appState = useRef(AppState.currentState);
  const [currentAppState, setCurrentAppState] = useState(appState.current);

  function hasComeToForeground(nextAppState: AppStateStatus) {
    return (
      appState.current.match(/inactive|background/) && nextAppState === "active"
    );
  }

  function hasGoneToBackground(nextAppState: AppStateStatus) {
    return (
      appState.current === "active" && nextAppState.match(/inactive|background/)
    );
  }

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (hasComeToForeground(nextAppState)) {
        if (onComeToForeground) onComeToForeground();
      }

      if (hasGoneToBackground(nextAppState)) {
        if (onGoneToBackground) onGoneToBackground();
      }

      appState.current = nextAppState;
      setCurrentAppState(appState.current);
    },
    [onComeToForeground, onGoneToBackground],
  );

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      appStateListener.remove();
    };
  }, [handleAppStateChange]);

  return {
    currentAppState,
  };
}
