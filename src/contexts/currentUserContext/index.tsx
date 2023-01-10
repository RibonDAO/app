import { stringToLocaleDateString } from "lib/formatters/dateFormatter";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "@ribon.io/shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ICurrentUserContext {
  currentUser: User | undefined;
  userLastDonation: string | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  setUserLastDonation: Dispatch<SetStateAction<string>>;
  updateCurrentUser: (data: Partial<User>) => void;
  logoutCurrentUser: () => void;
  signedIn: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CurrentUserContext = createContext<ICurrentUserContext>(
  {} as ICurrentUserContext,
);

export const CURRENT_USER_KEY = "CURRENT_USER_KEY";
export const CURRENT_USER_LAST_DONATION_KEY = "CURRENT_USER_LAST_DONATION_KEY";

function CurrentUserProvider({ children }: Props) {
  async function getUserFromLocalStorage() {
    const user = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!user || user === "undefined") return undefined;

    return JSON.parse(user);
  }

  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [userLastDonation, setUserLastDonation] = useState<string>("");

  useEffect(() => {
    async function setInitialUser() {
      const user = await getUserFromLocalStorage();
      const userLastDonation = await getUserLastDonation();
      setCurrentUser(user);
      setUserLastDonation(userLastDonation);
    }

    setInitialUser();
  }, []);

  async function getUserLastDonation() {
    const lastDonation = await AsyncStorage.getItem(
      `${CURRENT_USER_LAST_DONATION_KEY}_${currentUser?.id}`,
    );
    if (!lastDonation || lastDonation === "undefined") {
      if (currentUser?.lastDonationAt)
        return stringToLocaleDateString(currentUser.lastDonationAt);
      else return undefined;
    }

    return JSON.parse(lastDonation);
  }
  const [signedIn, setSignedIn] = useState(false);

  function updateCurrentUser(data: Partial<User>) {
    setCurrentUser({ ...currentUser, data } as User);
  }

  async function logoutCurrentUser() {
    setCurrentUser(undefined);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  }

  async function setUserInLocalStorage() {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  async function setUserLastDonationInLocalStorage() {
    if (!currentUser?.id) return;

    await AsyncStorage.setItem(
      `${CURRENT_USER_LAST_DONATION_KEY}_${currentUser?.id}`,
      JSON.stringify(userLastDonation),
    );
  }

  useEffect(() => {
    setSignedIn(!!currentUser);
    if (currentUser) setUserInLocalStorage();
    if (userLastDonation) setUserLastDonationInLocalStorage();
  }, [currentUser, userLastDonation]);

  const currentUserObject: ICurrentUserContext = useMemo(
    () => ({
      currentUser,
      userLastDonation,
      setCurrentUser,
      setUserLastDonation,
      updateCurrentUser,
      signedIn,
      logoutCurrentUser,
    }),
    [currentUser, userLastDonation, signedIn],
  );

  return (
    <CurrentUserContext.Provider value={currentUserObject}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }

  return context;
};
