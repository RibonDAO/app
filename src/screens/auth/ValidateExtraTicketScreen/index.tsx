import userAccountApi from "@ribon.io/shared/services/user/userAccountApi";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import { useNavigation } from "hooks/useNavigation";
import { useRouteParams } from "hooks/useRouteParams";
import { showToast } from "lib/Toast";
import { useEffect } from "react";

function ValidateExtraTicketScreen() {
  const { navigateTo } = useNavigation();
  const { params } = useRouteParams<"ValidateExtraTicketScreen">();
  const { extraTicketToken } = params;

  async function validateExtraTicket() {
    try {
      await userAccountApi.postValidateExtraTicket(extraTicketToken);

      // navigateTo("ReceiveExtraTicketScreen");
    } catch (error: any) {
      showToast({
        type: "error",
        message: "onErrorMessage",
      });
      navigateTo("CausesScreen");
    }
  }

  useEffect(() => {
    validateExtraTicket();
  }, []);

  return <LoaderAnimated width={160} height={160} />;
}

export default ValidateExtraTicketScreen;
