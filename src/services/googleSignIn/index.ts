import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
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
      return false;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return false;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return false;
    } else {
      return false;
    }
  }
};
