import { useEffect } from "react";
import { useAuthentication } from "contexts/authenticationContext";

import { useFirstAccessToIntegration } from "@ribon.io/shared/hooks";
import { INTEGRATION_AUTH_ID } from "utils/constants/Application";
import { useNavigation } from "hooks/useNavigation";
import { Loader } from "rn-placeholder";
import { View } from "react-native";
import S from "./styles";

function SignInByMagicLinkScreen(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { signInByMagicLink, extraTicket } = useAuthentication();
  const { isFirstAccessToIntegration, isLoading } =
    useFirstAccessToIntegration(INTEGRATION_AUTH_ID);

  const authenticate = () => {
    signInByMagicLink({
      onSuccess: () => {
        if (extraTicket === "true" && isFirstAccessToIntegration) {
          navigateTo("ReceiveTicketScreen");
        } else {
          navigateTo("CausesScreen");
        }
      },
      onError: () => {
        navigateTo("ExpiredLinkScreen");
      },
    });
  };

  useEffect(() => {
    if (!isLoading) authenticate();
  }, [isLoading]);

  return (
    <View style={S.container}>
      <Loader />
    </View>
  );
}

export default SignInByMagicLinkScreen;
