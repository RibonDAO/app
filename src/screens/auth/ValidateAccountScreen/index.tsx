import { useTranslation } from "react-i18next";
import usePageView from "hooks/usePageView";
import { useNavigation } from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import { showToast } from "lib/Toast";
import { userAccountApi } from "@ribon.io/shared";
import { useAuthentication } from "contexts/authenticationContext";
import ValidateAccount from "components/moleculars/validateAccount";
import { useRouteParams } from "hooks/useRouteParams";

function ValidateAccountScreen() {
  usePageView("P27_view", { from: "validation_flow" });
  const {
    params: { from },
  } = useRouteParams<"ValidateAccountScreen">();
  const { t } = useTranslation("translation", {
    keyPrefix: `${from}.validateAccountScreen`,
  });

  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { sendAuthenticationEmail } = useAuthentication();

  const onContinue = async (pathname: string) => {
    await userAccountApi.postSendValidatedEmail();
    navigateTo(pathname);
  };

  const onContinueMagicLink = (pathname: string) => {
    if (currentUser?.email) {
      sendAuthenticationEmail({ email: currentUser?.email });
      showToast({
        type: "success",
        message: t("toastSuccessMessage"),
      });
      navigateTo(pathname, { email: currentUser?.email });
    } else {
      navigateTo("InsertEmailScreen");
    }
  };

  return (
    <ValidateAccount
      title={t("title")}
      description={
        currentUser?.email
          ? t("description", { email: currentUser?.email })
          : t("descriptionWithoutEmail")
      }
      onContinue={() => onContinue("CausesScreen")}
      onContinueMagicLink={() =>
        onContinueMagicLink("SentMagicLinkEmailScreen")
      }
    />
  );
}

export default ValidateAccountScreen;
