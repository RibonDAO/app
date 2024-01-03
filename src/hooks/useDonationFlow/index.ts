import { logError } from "services/crashReport";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useDonations,
  useSources,
  useUserConfig,
  useUsers,
} from "@ribon.io/shared/hooks";

import { NonProfit } from "@ribon.io/shared/types";

import { normalizedLanguage } from "lib/currentLanguage";
import { PLATFORM } from "utils/constants/Application";
import { useIntegrationContext } from "contexts/integrationContext";
import { useUtmContext } from "contexts/utmContext";

type HandleDonateProps = {
  nonProfit: NonProfit;
  email: string;
  allowedEmailMarketing?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};
function useDonationFlow() {
  const { currentUser, signedIn, setCurrentUser } = useCurrentUser();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { donate } = useDonations(currentUser?.id);
  const { currentIntegrationId, externalId } = useIntegrationContext();
  const { utmSource, utmMedium, utmCampaign } = useUtmContext();
  const { updateUserConfig } = useUserConfig();

  async function handleDonate({
    nonProfit,
    email,
    allowedEmailMarketing,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    if (!signedIn) {
      const user = await findOrCreateUser(email, await normalizedLanguage());
      if (currentIntegrationId) createSource(user.id, currentIntegrationId);
      setCurrentUser(user);
      if (allowedEmailMarketing) {
        updateUserConfig(user.id, { allowedEmailMarketing });
      }
    }

    if (currentIntegrationId) {
      try {
        await donate(
          currentIntegrationId,
          nonProfit.id,
          email,
          PLATFORM,
          externalId,
          utmSource,
          utmMedium,
          utmCampaign,
        );
        if (onSuccess) onSuccess();
      } catch (e: any) {
        logError(e);
        if (onError) onError(e);
      }
    }
  }

  return { handleDonate };
}

export default useDonationFlow;
