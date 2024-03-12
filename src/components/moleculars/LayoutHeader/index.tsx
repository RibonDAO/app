import { useEffect, useState } from "react";
import { Alert } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import { useTranslation } from "react-i18next";
import { useWalletContext } from "contexts/walletContext";
import WalletIcon from "components/vectors/WalletIcon";
import { walletTruncate } from "lib/formatters/walletTruncate";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import TicketModal from "./modals/TicketModal";
import TicketSection from "./TicketSection";
import ConfigMenu from "./ConfigMenu";
import * as S from "./styles";

type Props = {
  hideTicket?: boolean;
  hideWallet?: boolean;
  outline?: boolean;
};
function LayoutHeader({
  hideTicket = false,
  hideWallet = true,
  outline = false,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader",
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const { connectWallet, wallet, killSession } = useWalletContext();

  useEffect(() => {
    if (menuVisible) logEvent("P18_view");
  }, [menuVisible]);

  const handleWalletButtonClick = () => {
    if (wallet) {
      Alert.alert("", t("disconnectWallet") || "", [
        { text: t("cancel") || "", style: "cancel" },
        { text: t("confirm") || "", onPress: () => killSession() },
      ]);
    }
    if (!wallet) connectWallet();
  };
  const toggleModal = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <S.ConfigContainer>
      {!hideTicket && (
        <TicketSection hasDividerBorder={!outline} outline={outline} />
      )}

      {!hideWallet && (
        <S.Container
          accessibilityRole="button"
          onPress={handleWalletButtonClick}
        >
          <S.WalletContainer>
            <S.WalletText>
              {wallet ? walletTruncate(wallet) : t("connectWallet")}
            </S.WalletText>
            <WalletIcon />
          </S.WalletContainer>
        </S.Container>
      )}

      {!hideTicket && (
        <TicketModal
          visible={ticketModalVisible}
          setVisible={setTicketModalVisible}
        />
      )}

      <S.Container accessibilityRole="button" onPress={toggleModal}>
        {outline ? (
          <Icon
            type="outlined"
            name="settings"
            size={24}
            color={theme.colors.neutral10}
          />
        ) : (
          <CogIcon />
        )}
      </S.Container>

      <ConfigMenu toggleModal={toggleModal} menuVisible={menuVisible} />
    </S.ConfigContainer>
  );
}

export default LayoutHeader;
