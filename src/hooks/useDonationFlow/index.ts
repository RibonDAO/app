import { logError } from "services/crashReport";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useSources,
  useTickets,
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
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();

  const { currentIntegrationId } = useIntegrationContext();
  const { utmSource, utmMedium, utmCampaign } = useUtmContext();
  const { updateUserConfig } = useUserConfig();
  const { collectAndDonateByIntegration } = useTickets();
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
        await collectAndDonateByIntegration(
          currentIntegrationId,
          nonProfit.id,
          email,
          PLATFORM,
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
