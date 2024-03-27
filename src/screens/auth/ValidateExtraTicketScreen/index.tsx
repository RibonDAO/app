import { userAccountApi } from "@ribon.io/shared";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import { useAuthentication } from "contexts/authenticationContext";
import { useNavigation } from "hooks/useNavigation";
import { showToast } from "lib/Toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ValidateExtraTicketScreen() {
  const { navigateTo } = useNavigation();
  const { extraTicketToken } = useAuthentication();
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.validateExtraTicketScreen",
  });

  async function validateExtraTicket(token: string) {
    try {
      const result = await userAccountApi.postValidateExtraTicket(token);
      if (result?.status === 200) navigateTo("ReceiveExtraTicketScreen");
    } catch (error: any) {
      showToast({
        type: "error",
        message: t("error"),
      });
      navigateTo("Root");
    }
  }

  useEffect(() => {
    if (extraTicketToken) validateExtraTicket(extraTicketToken);
  }, [extraTicketToken]);

  return <LoaderAnimated width={160} height={160} />;
}

export default ValidateExtraTicketScreen;
