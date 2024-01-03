import * as AppleAuthentication from "expo-apple-authentication";
import { logError } from "services/crashReport";

export const signIn = async () => {
  try {
    const userInfo = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    return { userInfo };
  } catch (error: any) {
    if (error.code === "ERR_REQUEST_CANCELED") {
      logError("user cancelled the login flow");
      return false;
    } else {
      logError("Error on apple sign in");
      return false;
    }
  }
};
