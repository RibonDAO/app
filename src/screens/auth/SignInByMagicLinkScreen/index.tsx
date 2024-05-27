import { useEffect } from "react";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { Loader } from "rn-placeholder";
import { View } from "react-native";
import S from "./styles";

function SignInByMagicLinkScreen(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { signInByMagicLink } = useAuthentication();

  const authenticate = () => {
    signInByMagicLink({
      onSuccess: () => {
        navigateTo("TabNavigator", { screen: "CausesScreen" });
      },
      onError: () => {
        navigateTo("ExpiredLinkScreen");
      },
    });
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <View style={S.container}>
      <Loader />
    </View>
  );
}

export default SignInByMagicLinkScreen;
