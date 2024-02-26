import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets as useTicketShared } from "@ribon.io/shared/hooks";

import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";

import { useIntegrationContext } from "contexts/integrationContext";
import { PLATFORM } from "utils/constants/Application";
import { todayDate } from "lib/dateUtils";
import { getLocalStorageItem } from "lib/localStorage";

export function useTickets() {
  const { currentUser } = useCurrentUser();
  const {
    canCollectByExternalIds,
    canCollectByIntegration,
    collectByExternalIds,
    collectByIntegration,
  } = useTicketShared();

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

  async function handleCollect() {
    if (externalIds && externalIds.length > 0 && currentIntegrationId) {
      await collectByExternalIds(
        externalIds,
        currentIntegrationId ?? "",
        PLATFORM,
        currentUser?.email ?? "",
      );
    } else if (currentIntegrationId) {
      await collectByIntegration(
        currentIntegrationId,
        currentUser?.email ?? "",
        PLATFORM,
      );
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    hasReceivedTicketToday,
  };
}
