import { useCurrentUser } from "contexts/currentUserContext";
import { useState } from "react";
import { Text, View } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import GlobeIcon from "components/vectors/GlobeIcon";
import SupportIcon from "components/vectors/SupportIcon";
import LetterIcon from "components/vectors/LetterIcon";
import { TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal";
import RoundButton from "components/atomics/RoundButton";
import TicketIcon from "components/vectors/TicketIcon";
import GrayTicketIcon from "components/vectors/GrayTicketIcon";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared/styles";
import { useTickets } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import ConfigItem from "../ConfigItem";
import BlockedDonationModal from "./BlockedDonationModal";
import TicketModal from "./TicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import S from "./styles";

type Props = {
  hideTicket?: boolean;
};
function LayoutHeader({ hideTicket = false }: Props): JSX.Element {
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

  function toggleModal() {
    setMenuVisible(!menuVisible);
  }

  function handleLogout() {
    logoutCurrentUser();
    navigateTo("CausesScreen");
    toggleModal();
  }

  function redirectToProfileScreen() {
    toggleModal();
    navigateTo("ProfileScreen");
  }

  function handleUserLogin() {
    return currentUser ? (
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
  }

  function toggleTicketModal() {
    setTicketModalVisible(!ticketModalVisible);
  }

  function toggleBlockedDonationModal() {
    setBlockedDonationModalVisible(!ticketModalVisible);
  }

  function renderTicketModal() {
    if (hideTicket) return <View />;

    return (
      <TicketModal
        visible={ticketModalVisible}
        setVisible={setTicketModalVisible}
      />
    );
  }

  function renderBlockedDonationModal() {
    if (hideTicket) return <View />;

    return (
      <BlockedDonationModal
        visible={blockedDonationModalVisible}
        setVisible={setBlockedDonationModalVisible}
      />
    );
  }

  function handleTicketClick() {
    if (hasTickets()) {
      toggleTicketModal();
    } else {
      toggleBlockedDonationModal();
    }
  }

  function linkToSupport() {
    Linking.openURL(
      "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=ribonapp.zendesk.com",
    );
  }

  function renderConfigModal() {
    return (
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
  }

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
