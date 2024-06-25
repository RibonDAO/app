import * as AppleAuthentication from "expo-apple-authentication";

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
      return false;
    } else {
      return false;
    }
  }
};
