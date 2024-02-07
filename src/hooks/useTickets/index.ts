import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets as useTicketShared } from "@ribon.io/shared/hooks";

import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";

import { useAuthentication } from "contexts/authenticationContext";
import { getLocalStorageItem, setLocalStorageItem } from "@ribon.io/shared/lib";
import { useIntegrationContext } from "contexts/integrationContext";
import { PLATFORM } from "utils/constants/Application";
import { showToast } from "lib/Toast";
import { theme } from "@ribon.io/shared/styles";
import { todayDate } from "lib/dateUtils";
import { useTranslation } from "react-i18next";

export function useTickets() {
  const { currentUser } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
  const {
    canCollectByExternalIds,
    canCollectByIntegration,
    collectByExternalIds,
    collectByIntegration,
  } = useTicketShared();

  const { currentIntegrationId, externalId } = useIntegrationContext();
  const externalIds = externalId?.split(",");
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen.ticketSection",
  });

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
        PLATFORM,
        currentUser?.email ?? "",
      );
    }
  }

  async function receiveTicket() {
    const canCollect = await handleCanCollect();

    if (canCollect && !hasReceivedTicketToday()) {
      if (isAuthenticated()) {
        await handleCollect();
      }
      await setLocalStorageItem(
        DONATION_TOAST_SEEN_AT_KEY,
        Date.now().toString(),
      );
      await setLocalStorageItem(
        DONATION_TOAST_INTEGRATION,
        currentIntegrationId?.toLocaleString(),
      );

      showToast({
        type: "custom",
        message: t("ticketToast"),
        position: "bottom",
        navigate: "GiveTicketScreen",
        icon: "confirmation_number",
        backgroundColor: theme.colors.brand.primary[50],
        iconColor: theme.colors.brand.primary[600],
        borderColor: theme.colors.brand.primary[600],
        textColor: theme.colors.brand.primary[600],
      });
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    receiveTicket,
    hasReceivedTicketToday,
  };
}
