import { useApi } from "@ribon.io/shared/hooks";
import { emptyRequest } from "@ribon.io/shared/services";
import { useCurrentUser } from "contexts/currentUserContext";
import * as DeviceInfo from "expo-device";
import deviceApi from "services/api/deviceApi";
import { Device } from "types/entities/Device";
import { useCallback } from "react";
import { getNotificationToken } from "lib/notifications";

function useDevices() {
  const { currentUser } = useCurrentUser();

  const registerDevice = useCallback(() => {
    const { data, error, isLoading, refetch } = useApi<Device>({
      key: "registerDevices",
      fetchMethod: async () => {
        const notificationToken = await getNotificationToken();
        if (!currentUser?.id) return emptyRequest();

        return deviceApi.registerDevice({
          deviceId: DeviceInfo.deviceName,
          deviceToken: notificationToken,
          userId: currentUser.id,
        });
      },
    });

    return {
      data,
      error,
      isLoading,
      refetch,
    };
  }, [currentUser?.id]);

  return {
    registerDevice,
  };
}

export default useDevices;
