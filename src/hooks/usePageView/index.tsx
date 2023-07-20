import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { logEvent } from "services/analytics";

function usePageView(eventName: string, eventParams = {}) {
  useFocusEffect(
    useCallback(() => {
      logEvent(eventName, eventParams);
    }, []),
  );
}

export default usePageView;
