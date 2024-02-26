import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useWalletContext } from "contexts/walletContext";
import WalletIcon from "components/vectors/WalletIcon";
import { walletTruncate } from "lib/formatters/walletTruncate";
import { logEvent } from "services/analytics";

import TicketModal from "./modals/TicketModal";
import S from "./styles";
import TicketSection from "./TicketSection";
import ConfigMenu from "./ConfigMenu";

type Props = {
  hideTicket?: boolean;
  hideWallet?: boolean;
};
function LayoutHeader({
  hideTicket = false,
  hideWallet = true,
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
    <View style={S.configContainer}>
      {!hideTicket && <TicketSection hasDividerBorder />}

      {!hideWallet && (
        <TouchableOpacity
          accessibilityRole="button"
          style={S.container}
          onPress={handleWalletButtonClick}
        >
          <View style={S.walletContainer}>
            <Text style={S.walletText}>
              {wallet ? walletTruncate(wallet) : t("connectWallet")}
            </Text>
            <WalletIcon />
          </View>
        </TouchableOpacity>
      )}

      {!hideTicket && (
        <TicketModal
          visible={ticketModalVisible}
          setVisible={setTicketModalVisible}
        />
      )}

      <TouchableOpacity
        accessibilityRole="button"
        style={S.container}
        onPress={toggleModal}
      >
        <CogIcon />
      </TouchableOpacity>

      <ConfigMenu toggleModal={toggleModal} menuVisible={menuVisible} />
    </View>
  );
}

export default LayoutHeader;
