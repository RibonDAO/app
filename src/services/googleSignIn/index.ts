import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { logError } from "services/crashReport";
import { GOOGLE_WEB_CLIENT_ID } from "utils/constants/Application";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return { userInfo };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      logError("user cancelled the login flow");
      return false;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      logError("operation sign in is in progress already");
      return false;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      logError("play services not available or outdated");
      return false;
    } else {
      logError("Error on google sign in");
      return false;
    }
  }
};
