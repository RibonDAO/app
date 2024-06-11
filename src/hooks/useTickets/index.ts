import { useCurrentUser } from "contexts/currentUserContext";
import {
  useTickets as useTicketShared,
  useUserTickets,
} from "@ribon.io/shared/hooks";

import {
  RECEIVED_TICKET_FROM_INTEGRATION,
  RECEIVED_TICKET_AT_KEY,
} from "lib/localStorage/constants";

import { useIntegrationContext } from "contexts/integrationContext";
import { PLATFORM } from "utils/constants/Application";
import { todayDate } from "lib/dateUtils";
import { getLocalStorageItem } from "lib/localStorage";
import { logError } from "services/crashReport";

type HandleCollectProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type HandleCollectByClubProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  category: string;
};

export function useTickets() {
  const { currentUser } = useCurrentUser();
  const {
    canCollectByExternalIds,
    canCollectByIntegration,
    collectByExternalIds,
    collectByIntegration,
  } = useTicketShared();

  const { collectByClub } = useUserTickets();

  const { currentIntegrationId, externalId } = useIntegrationContext();
  const externalIds =
    externalId && externalId?.length > 0 ? externalId?.split(",") : null;

  async function hasReceivedTicketToday() {
    const receivedTicketAtKey = await getLocalStorageItem(
      RECEIVED_TICKET_AT_KEY,
    );
    const receivedTicketIntegration = await getLocalStorageItem(
      RECEIVED_TICKET_FROM_INTEGRATION,
    );

    if (
      receivedTicketAtKey &&
      receivedTicketIntegration === currentIntegrationId.toLocaleString()
    ) {
      const dateUserReceivedTicket = new Date(
        parseInt(receivedTicketAtKey, 10),
      );
      return dateUserReceivedTicket.toLocaleDateString() === todayDate();
    }
    return false;
  }

  async function handleCanCollect() {
    if (externalIds && externalIds.length > 0) {
      const { canCollect } = await canCollectByExternalIds(externalIds);

      return canCollect;
    } else if (currentIntegrationId) {
      const { canCollect } = await canCollectByIntegration(
        currentIntegrationId,
        currentUser?.email ?? "",
      );
      return canCollect;
    } else {
      return false;
    }
  }

  async function handleCollect({ onError, onSuccess }: HandleCollectProps) {
    try {
      if (externalIds && externalIds.length > 0 && currentIntegrationId) {
        await collectByExternalIds(
          externalIds,
          currentIntegrationId ?? "",
          PLATFORM,
          currentUser?.email ?? "",
        );
        if (onSuccess) onSuccess();
      } else if (currentIntegrationId) {
        await collectByIntegration(
          currentIntegrationId,
          PLATFORM,
          currentUser?.email ?? "",
        );
        if (onSuccess) onSuccess();
      }
    } catch (e: any) {
      logError(e);
      if (onError) onError(e);
    }
  }

  async function handleCollectByClub({
    onError,
    onSuccess,
    category,
  }: HandleCollectByClubProps) {
    try {
      await collectByClub(PLATFORM, category);
      if (onSuccess) onSuccess();
    } catch (e: any) {
      logError(e);
      if (onError) onError(e);
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    hasReceivedTicketToday,
    handleCollectByClub,
  };
}
