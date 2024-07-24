import AsyncStorage from "@react-native-async-storage/async-storage";
import { userAuthenticationApi } from "@ribon.io/shared/services";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "lib/localStorage";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "lib/localStorage/constants";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { logError } from "services/crashReport";

// TODO: Use the shared methods when R4B structure is done
import otpAuthenticationApi from "services/user/userAuthenticationApi";

type authTokenProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

type otpAuthProps = {
  code: string;
  onSuccess?: () => void;
  onError?: () => void;
};

type authenticationEmailProps = {
  email?: string;
  id?: string;
  onSuccess?: () => void;
  onError?: () => void;
};
export interface IAuthenticationContext {
  accessToken: string | null;
  magicLinkToken: string | null;
  accountId: string | null;
  logout: () => void;
  signInWithGoogle: (response: any) => void;
  signInByMagicLink: (signInByMagicLinkProps: authTokenProps) => void;
  sendAuthenticationEmail: (
    sendAuthenticationEmailProps: authenticationEmailProps,
  ) => void;
  signInWithApple: (response: any) => void;
  isAuthenticated: () => boolean;
  setMagicLinkToken: (token: string) => void;
  setAccountId: (id: string) => void;
  sendOtpEmail: (
    sendOtpEmailProps: authenticationEmailProps,
  ) => Promise<string>;
  signInByOtp: (signInByOtpProps: otpAuthProps) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [magicLinkToken, setMagicLinkToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const { setCurrentUser } = useCurrentUser();
  const emailDoesNotMatchMessage = "Email does not match";

  const fetchAcessToken = async () => {
    const accessTokenKey = await getLocalStorageItem(ACCESS_TOKEN_KEY);
    setAccessToken(accessTokenKey);
  };

  function isAuthenticated() {
    return !!accessToken;
  }

  async function logout() {
    await removeLocalStorageItem(ACCESS_TOKEN_KEY);
    await removeLocalStorageItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    fetchAcessToken();
  }

  function signIn(response: any) {
    const token = response.headers["access-token"];
    const refreshToken = response.headers["refresh-token"];

    setLocalStorageItem(ACCESS_TOKEN_KEY, token);
    setLocalStorageItem(REFRESH_TOKEN_KEY, refreshToken);
    setAccessToken(token);
    setCurrentUser(response.data.user);
  }

  async function signInWithGoogle(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.access_token,
        "google_oauth2",
      );

      signIn(authResponse);
    } catch (error: any) {
      if (error.response) {
        const apiErrorMessage =
          error.response.data.formatted_message === emailDoesNotMatchMessage
            ? emailDoesNotMatchMessage
            : "Unknown error";
        throw new Error(apiErrorMessage);
      }
      throw new Error("google auth error");
    }
  }

  async function signInByMagicLink({ onSuccess, onError }: authTokenProps) {
    try {
      const response = await userAuthenticationApi.postAuthorizeFromAuthToken(
        magicLinkToken,
        accountId,
      );

      signIn(response);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
  }

  async function sendAuthenticationEmail({
    email,
    id,
    onSuccess,
    onError,
  }: authenticationEmailProps) {
    try {
      const response = await userAuthenticationApi.postSendAuthenticationEmail(
        email,
        id,
      );
      if (onSuccess) onSuccess();
      setCurrentUser(response.data.user);
      return response.data.user.email;
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
    return "";
  }

  async function sendOtpEmail({
    email,
    id,
    onSuccess,
    onError,
  }: authenticationEmailProps) {
    try {
      const response = await otpAuthenticationApi.postSendOtpEmail(email, id);
      if (onSuccess) onSuccess();
      setCurrentUser(response.data.user);
      setAccountId(response.data.accountId);
      return response.data.user.email;
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
    return "";
  }

  async function signInByOtp({ code, onSuccess, onError }: otpAuthProps) {
    try {
      const response = await otpAuthenticationApi.postAuthorizeFromOtpCode(
        code,
        accountId,
      );

      signIn(response);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
  }

  async function signInWithApple(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.access_token,
        "apple",
      );

      signIn(authResponse);
    } catch (error: any) {
      if (error.response) {
        const apiErrorMessage =
          error?.response?.data?.formatted_message === emailDoesNotMatchMessage
            ? emailDoesNotMatchMessage
            : "Unknown error";
        throw new Error(apiErrorMessage);
      }
      throw new Error("apple auth error");
    }
  }

  useEffect(() => {
    fetchAcessToken();
  }, []);

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      logout,
      accessToken,
      signInWithGoogle,
      signInByMagicLink,
      sendAuthenticationEmail,
      signInWithApple,
      isAuthenticated,
      accountId,
      setAccountId,
      magicLinkToken,
      setMagicLinkToken,
      sendOtpEmail,
      signInByOtp,
    }),
    [accessToken, magicLinkToken, accountId],
  );

  return (
    <AuthenticationContext.Provider value={authenticationObject}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }

  return context;
};
