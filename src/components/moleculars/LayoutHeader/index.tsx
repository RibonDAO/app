import { useCurrentUser } from "contexts/currentUserContext";
import { useState } from "react";
import { Text, View } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import GlobeIcon from "components/vectors/GlobeIcon";
import SupportIcon from "components/vectors/SupportIcon";
import LetterIcon from "components/vectors/LetterIcon";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import RoundButton from "components/atomics/RoundButton";
import TicketIcon from "components/vectors/TicketIcon";
import GrayTicketIcon from "components/vectors/GrayTicketIcon";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared/styles";
import { useTickets } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import { useWalletContext } from "contexts/walletContext";
import WalletIcon from "components/vectors/WalletIcon";
import { walletTruncate } from "lib/formatters/walletTruncate";
import ConfigItem from "../ConfigItem";
import BlockedDonationModal from "./BlockedDonationModal";
import TicketModal from "./TicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import { openInWebViewer } from "lib/linkOpener";
import S from "./styles";

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
  const [blockedDonationModalVisible, setBlockedDonationModalVisible] =
    useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { tickets, hasTickets } = useTickets();
  const ticketColor = hasTickets()
    ? theme.colors.brand.primary[600]
    : theme.colors.neutral[500];
  const ticketIcon = hasTickets() ? <TicketIcon /> : <GrayTicketIcon />;
  const { connectWallet, wallet } = useWalletContext();

  const handleWalletButtonClick = () => {
    if (!wallet) connectWallet();
  };
  const toggleModal = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logoutCurrentUser();
    navigateTo("CausesScreen");
    toggleModal();
  };

  const handleUserLogin = () =>
    currentUser ? (
      <View style={{ width: 50 }}>
        <RoundButton
          active={false}
          text={t("exitButton")}
          onPress={handleLogout}
        />
      </View>
    ) : (
      <Icon
        type="rounded"
        size={20}
        color={theme.colors.brand.primary[300]}
        name="arrow_forward_ios"
        onPress={toggleModal}
      />
    );

  const toggleTicketModal = () => {
    setTicketModalVisible(!ticketModalVisible);
  };

  const toggleBlockedDonationModal = () => {
    setBlockedDonationModalVisible(!ticketModalVisible);
  };

  const renderTicketModal = () => {
    if (hideTicket) return <View />;

    return (
      <TicketModal
        visible={ticketModalVisible}
        setVisible={setTicketModalVisible}
      />
    );
  };

  const renderBlockedDonationModal = () => {
    if (hideTicket) return <View />;

    return (
      <BlockedDonationModal
        visible={blockedDonationModalVisible}
        setVisible={setBlockedDonationModalVisible}
      />
    );
  };

  const handleTicketClick = () => {
    if (hasTickets()) {
      toggleTicketModal();
    } else {
      toggleBlockedDonationModal();
    }
  };

  const linkToSupport = () => {
    openInWebViewer(
      "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=ribonapp.zendesk.com",
    );
  };

  const renderConfigModal = () => (
    <Modal
      isVisible={menuVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop
      backdropOpacity={0.2}
      onBackdropPress={toggleModal}
    >
      <View style={S.supportContainer}>
        <ConfigItem
          icon={SupportIcon}
          text={t("support")}
          onPress={linkToSupport}
          cta={
            <Icon
              type="rounded"
              size={20}
              color={theme.colors.brand.primary[300]}
              name="arrow_forward_ios"
              onPress={linkToSupport}
            />
          }
        />

        <ConfigItem
          icon={LetterIcon}
          text={currentUser ? currentUser?.email : t("login")}
          onPress={currentUser ? handleLogout : toggleModal}
          cta={handleUserLogin()}
        />

        <ConfigItem
          icon={GlobeIcon}
          text={t("language")}
          linkIcon={ChangeLanguageItem}
        />
      </View>
    </Modal>
  );

  return (
    <View style={S.configContainer}>
      {!hideTicket && (
        <TouchableOpacity style={S.container} onPress={handleTicketClick}>
          <View style={{ ...S.ticketSection, borderColor: ticketColor }}>
            <Text style={{ ...S.ticketCounter, color: ticketColor }}>
              {tickets}
            </Text>
            {ticketIcon}
          </View>
        </TouchableOpacity>
      )}

      {!hideWallet && (
        <TouchableOpacity style={S.container} onPress={handleWalletButtonClick}>
          <View style={S.walletContainer}>
            <Text style={S.walletText}>
              {wallet ? walletTruncate(wallet) : t("connectWallet")}
            </Text>
            <WalletIcon />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={S.container} onPress={toggleModal}>
        <CogIcon />
      </TouchableOpacity>

      {renderTicketModal()}

      {renderBlockedDonationModal()}

      {renderConfigModal()}
    </View>
  );
}

export default LayoutHeader;
