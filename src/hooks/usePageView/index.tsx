import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { logEvent } from "services/analytics";

function usePageView(eventName: string, eventParams?: Record<any, any>) {
  useFocusEffect(
    useCallback(() => {
      if (eventParams) {
        logEvent(eventName, eventParams);
        return;
      }

      logEvent(eventName);
    }, []),
  );
}

export default usePageView;
