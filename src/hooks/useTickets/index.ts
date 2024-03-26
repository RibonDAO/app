import { useCurrentUser } from "contexts/currentUserContext";
import {
  useTickets as useTicketShared,
  useUserTickets,
} from "@ribon.io/shared/hooks";

import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
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
    const donationToastSeenAtKey = await getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );
    const donationToastIntegration = await getLocalStorageItem(
      DONATION_TOAST_INTEGRATION,
    );

    if (
      donationToastSeenAtKey &&
      donationToastIntegration === currentIntegrationId.toLocaleString()
    ) {
      const dateUserSawToast = new Date(parseInt(donationToastSeenAtKey, 10));
      return dateUserSawToast.toLocaleDateString() === todayDate();
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
