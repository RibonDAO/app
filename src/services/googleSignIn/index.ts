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
      throw new Error("user cancelled the login flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error("operation sign in is in progress already");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error("play services not available or outdated");
    } else {
      throw new Error("Error on google sign in");
    }
  }
};
