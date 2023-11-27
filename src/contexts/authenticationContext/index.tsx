import { getLocalStorageItem, removeLocalStorageItem } from "lib/localStorage";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "lib/localStorage/constants";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// todo: create goggle, apple and magic link login
export interface IAuthenticationContext {
  accessToken: string | null;
  logout: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState("");

  function logout() {
    removeLocalStorageItem(ACCESS_TOKEN_KEY);
    removeLocalStorageItem(REFRESH_TOKEN_KEY);
  }

  const fetchAcessToken = async () => {
    const accessTokenKey = await getLocalStorageItem(ACCESS_TOKEN_KEY);
    if (accessTokenKey) setAccessToken(accessTokenKey);
  };

  useEffect(() => {
    fetchAcessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken]);

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      logout,
      accessToken,
    }),
    [accessToken],
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
