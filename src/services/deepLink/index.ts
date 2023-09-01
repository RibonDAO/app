import branch from "react-native-branch";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export async function initializeDeeplink(
  navigateTo: (path: string) => void,
  setCurrentIntegrationId: (integrationId: string) => void,
  setExternalId: (externalId: string) => void,
) {
  branch.subscribe({
    onOpenStart: ({ uri, cachedInitialEvent }) => {
      // eslint-disable-next-line no-console
      console.log(
        `subscribe onOpenStart, will open ${uri} cachedInitialEvent is ${cachedInitialEvent}`,
      );
    },
    onOpenComplete: async () => {
      const latestParams = await branch.getLatestReferringParams();
      const integrationId =
        (latestParams.integration_id as string) || RIBON_INTEGRATION_ID;

      const externalId = (latestParams.external_id as string) || "";

      setCurrentIntegrationId(integrationId);
      setExternalId(externalId);

      if (latestParams.$custom_meta_tags)
        navigateTo(latestParams.$custom_meta_tags as string);
    },
  });
}
