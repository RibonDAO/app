import { logError } from "services/crashReport";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useSources,
  useTickets,
  useUsers,
  useUserTickets,
} from "@ribon.io/shared/hooks";

import { NonProfit } from "@ribon.io/shared/types";

import { normalizedLanguage } from "lib/currentLanguage";
import { PLATFORM } from "utils/constants/Application";
import { useIntegrationContext } from "contexts/integrationContext";
import { useUtmContext } from "contexts/utmContext";

type HandleCollectAndDonateProps = {
  nonProfit: NonProfit;
  email: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type HandleDonateProps = {
  nonProfit: NonProfit;
  ticketsQuantity: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

function useDonationFlow() {
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();

  const { currentIntegrationId } = useIntegrationContext();
  const { utmSource, utmMedium, utmCampaign } = useUtmContext();
  const { collectAndDonateByIntegration } = useTickets();

  async function handleCollectAndDonate({
    nonProfit,
    email,
    onError,
    onSuccess,
  }: HandleCollectAndDonateProps) {
    if (!signedIn) {
      const user = await findOrCreateUser(email, await normalizedLanguage());
      if (currentIntegrationId) createSource(user.id, currentIntegrationId);
      setCurrentUser(user);
    }

    if (currentIntegrationId) {
      try {
        // if(externalId){
        //   await collectAndDonateByExternalId{

        //   }
        // }
        await collectAndDonateByIntegration(
          currentIntegrationId,
          nonProfit.id,
          PLATFORM,
          email,
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

  async function handleDonate({
    nonProfit,
    ticketsQuantity,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    const { donate } = useUserTickets();

    try {
      await donate(
        nonProfit.id,
        ticketsQuantity,
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

  return { handleCollectAndDonate, handleDonate };
}

export default useDonationFlow;
