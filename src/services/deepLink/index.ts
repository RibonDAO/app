import { setLocalStorageItem } from "@ribon.io/shared";
import branch from "react-native-branch";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export const INTEGRATION_ID = "integration_id";
export async function initializeDeeplink(navigateTo: (path: string) => void) {
  branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      // eslint-disable-next-line no-console
      console.log(
        `subscribe onOpenStart, will open ${uri} cachedInitialEvent is ${cachedInitialEvent}`,
      );
    },
    onOpenComplete: async ({ error, params, uri }) => {
      const latestParams = await branch.getLatestReferringParams();
      const integrationId =
        (latestParams.$integration_id as string) || RIBON_INTEGRATION_ID;
      setLocalStorageItem(INTEGRATION_ID, integrationId);
      if (error) {
        // eslint-disable-next-line no-console
        console.error(
          `subscribe onOpenComplete, Error from opening uri: ${uri} error: ${error}`,
        );
        if (latestParams.$custom_meta_tags)
          navigateTo(latestParams.$custom_meta_tags as string);
        return;
      }
      if (params) {
        if (params.navigate) {
          navigateTo(params.navigate as string);
        }
      }
    },
  });
}
