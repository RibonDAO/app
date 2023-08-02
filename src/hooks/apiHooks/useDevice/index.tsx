import { useCurrentUser } from "contexts/currentUserContext";
import * as DeviceInfo from "expo-device";
import deviceApi from "services/api/deviceApi";
import { getNotificationToken } from "lib/notifications";
import { logError } from "services/crashReport";

function useDevices() {
  const { currentUser } = useCurrentUser();

  const registerDevice = async () => {
    const notificationToken = await getNotificationToken();
    if (!currentUser?.id) return;

    try {
      deviceApi.registerDevice({
        deviceId: DeviceInfo.deviceName,
        deviceToken: notificationToken,
        userId: currentUser.id,
      });
    } catch (e) {
      logError(e);
    }
  };

  return {
    registerDevice,
  };
}

export default useDevices;
