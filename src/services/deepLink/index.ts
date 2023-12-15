import branch from "react-native-branch";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";

export async function initializeDeeplink(
  navigateTo: (path: string) => void,
  setCurrentIntegrationId: (integrationId: string) => void,
  setExternalId: (externalId: string) => void,
  setUtm: (utmSource: string, utmMedium: string, utmCampaign: string) => void,
  setMagicLinkToken: (magicLinkToken: string) => void,
  setAccountId: (accountId: string) => void,
  setExtraTicket: (accountId: string) => void,
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
      const utmSource = (latestParams.utm_source as string) || "";
      const utmMedium = (latestParams.utm_medium as string) || "";
      const utmCampaign = (latestParams.utm_campaign as string) || "";

      const magicLinkToken = (latestParams.authToken as string) || "";
      const accountId = (latestParams.id as string) || "";
      const extraTicket = (latestParams.extra_ticket as string) || "";

      setCurrentIntegrationId(integrationId);
      setExternalId(externalId);

      setUtm(utmSource, utmMedium, utmCampaign);

      setMagicLinkToken(magicLinkToken);
      setAccountId(accountId);
      setExtraTicket(extraTicket);

      if (latestParams.$custom_meta_tags)
        navigateTo(latestParams.$custom_meta_tags as string);
    },
  });
}
