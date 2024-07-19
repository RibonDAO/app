import usePageView from "hooks/usePageView";
import { useNavigation } from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import { useAuthentication } from "contexts/authenticationContext";
import { useEffect } from "react";
import { Loader } from "rn-placeholder";
import { View } from "react-native";
import S from "./styles";

function ValidateAccountScreen() {
  usePageView("P27_view", { from: "validation_flow" });

  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { isAuthenticated, sendOtpEmail, accountId } = useAuthentication();

  const handleAuthenticatedUser = () => {
    navigateTo("TabNavigator", { screen: "CausesScreen" });
  };

  const handleUserNotFilledEmail = () => {
    navigateTo("InsertEmailScreen");
  };

  const handleUserWithoutAccountId = () => {
    sendOtpEmail({ email: currentUser?.email });
    navigateTo("InsertOtpCodeScreen", { email: currentUser?.email });
  };

  const handleUserWithAccountId = () => {
    navigateTo("InsertOtpCodeScreen", { email: currentUser?.email });
  };

  useEffect(() => {
    if (isAuthenticated()) handleAuthenticatedUser();
    else if (!currentUser?.email) handleUserNotFilledEmail();
    else if (!accountId) handleUserWithoutAccountId();
    else handleUserWithAccountId();
  }, [currentUser, accountId]);

  return (
    <View style={S.container}>
      <Loader />
    </View>
  );
}

export default ValidateAccountScreen;
