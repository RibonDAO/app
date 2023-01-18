import { useMemo } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { logError } from "services/crashReport";

export function useProvider() {
  return useMemo(() => {
    try {
      const provider = new JsonRpcProvider();

      return provider;
    } catch (e) {
      logError(e);
    }

    return null;
  }, []);
}
