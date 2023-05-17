import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
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
import { openInWebViewer } from "lib/linkOpener";
import { Linking, Platform } from "react-native";
import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { isNotificationsEnabled } from "lib/notifications";
import { useFocusEffect } from "@react-navigation/native";
import ConfigItem from "../ConfigItem";
import BlockedDonationModal from "./BlockedDonationModal";
import TicketModal from "./TicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { tickets, hasTickets } = useTickets();
  const ticketColor = hasTickets()
    ? theme.colors.brand.primary[600]
    : theme.colors.neutral[500];
  const ticketIcon = hasTickets() ? <TicketIcon /> : <GrayTicketIcon />;
  const { connectWallet, wallet, killSession } = useWalletContext();

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

  const handleLogout = () => {
    logoutCurrentUser();
    navigateTo("CausesScreen");
    toggleModal();
  };

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
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

  useFocusEffect(
    useCallback(() => {
      isNotificationsEnabled().then((enabled) =>
        setNotificationsEnabled(Boolean(enabled)),
      );
    }, []),
  );

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
    openInWebViewer(t("supportLink"));
  };

  const notificationsSwitch = () => (
    <ButtonSwitch
      leftText=""
      rightText=""
      onSwitch={() => handleOpenSettings()}
      initialCheckState={notificationsEnabled || false}
    />
  );

  const notificationsIcon = () => (
    <Icon
      type="rounded"
      size={25}
      color={theme.colors.brand.primary[300]}
      name="notifications"
    />
  );

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
          icon={notificationsIcon}
          text={t("notifications")}
          linkIcon={notificationsSwitch}
        />

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
