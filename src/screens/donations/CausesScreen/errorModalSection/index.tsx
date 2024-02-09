import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useNavigation } from "hooks/useNavigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocationStateType } from "../LocationStateType";

export type Props = {
  newState: LocationStateType;
};

export default function DonationErrorModal({ newState }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { navigateTo } = useNavigation();
  const [failedModalVisible, setFailedModalVisible] = useState(false);
  const [unauthorizedModalVisible, setUnauthorizedModalVisible] =
    useState(false);

  useEffect(() => {
    if (newState?.failedDonation) {
      setFailedModalVisible(true);
    } else if (newState?.unauthorizedDonation) {
      setUnauthorizedModalVisible(true);
    }
  }, [newState]);

  return (
    <>
      <ModalDialog
        visible={failedModalVisible}
        setVisible={setFailedModalVisible}
        title={t("errorModalTitle")}
        description={t("errorModalText")}
        primaryButton={{
          text: t("errorModalButtonText"),
          onPress: () => {
            setFailedModalVisible(false);
          },
        }}
      />
      <ModalDialog
        visible={unauthorizedModalVisible}
        setVisible={setUnauthorizedModalVisible}
        title={t("unauthorizedModalTitle")}
        description={t("unauthorizedModalText")}
        primaryButton={{
          text: t("unauthorizedModalButtonText"),
          onPress: () => {
            navigateTo("ValidateAccountScreen");
          },
        }}
      />
    </>
  );
}
