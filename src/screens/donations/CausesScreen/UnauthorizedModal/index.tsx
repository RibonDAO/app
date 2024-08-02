import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";

export type Props = {
  setUnauthorizedModalVisible: (value: boolean) => void;
  unauthorizedModalVisible: boolean;
};

export default function UnauthorizedModal({
  setUnauthorizedModalVisible,
  unauthorizedModalVisible,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { navigateTo } = useNavigation();

  return (
    <ModalDialog
      type="success"
      visible={unauthorizedModalVisible}
      setVisible={setUnauthorizedModalVisible}
      title={t("unauthorizedContributionModalTitle")}
      description={t("unauthorizedContributionModalText")}
      primaryButton={{
        text: t("unauthorizedContributionModalButtonText"),
        onPress: () => {
          setUnauthorizedModalVisible(false);
          navigateTo("ValidateAccountScreen", {
            from: "auth",
          });
        },
      }}
    />
  );
}
