import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import GlobeIcon from "components/vectors/GlobeIcon";
import SupportIcon from "components/vectors/SupportIcon";
import LetterIcon from "components/vectors/LetterIcon";
import { TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal";
import RoundButton from "components/atomics/RoundButton";
import { useCanDonate } from "@ribon.io/shared";
import TicketIcon from "components/vectors/TicketIcon";
import GrayTicketIcon from "components/vectors/GrayTicketIcon";
import { useNavigation } from "hooks/useNavigation";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { theme } from "@ribon.io/shared/styles";
import ConfigItem from "../ConfigItem";
import BlockedDonationModal from "./BlockedDonationModal";
import TicketModal from "./TicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import S from "./styles";

type Props = {
  hideTicket?: boolean;
};
function LayoutHeader({ hideTicket = false }: Props): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [blockedDonationModalVisible, setBlockedDonationModalVisible] =
    useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { canDonate, refetch } = useCanDonate(RIBON_INTEGRATION_ID);
  const ticketColor = canDonate ? theme.colors.green30 : theme.colors.gray30;
  const ticketIcon = canDonate ? TicketIcon : GrayTicketIcon;

  function toggleModal() {
    setMenuVisible(!menuVisible);
  }

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 200);
  }, [JSON.stringify(currentUser)]);

  const renderTicketCounter = useCallback(
    () => (canDonate ? 1 : 0),
    [canDonate],
  );

  function handleLogout() {
    logoutCurrentUser();
    navigateTo("CausesScreen");
    toggleModal();
  }

  function handleUserLogin() {
    return currentUser ? (
      <RoundButton active={false} text="Sair" onPress={handleLogout} />
    ) : (
      <RoundButton text="Doar" onPress={toggleModal} />
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
    if (canDonate) {
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
            icon={GlobeIcon}
            text="Alterar idioma"
            linkIcon={ChangeLanguageItem}
          />

          <ConfigItem
            icon={SupportIcon}
            text="Suporte ao Usuário"
            cta={<RoundButton text="Suporte" onPress={linkToSupport} />}
          />

          <ConfigItem
            icon={LetterIcon}
            text={currentUser ? currentUser?.email : "Fazer login"}
            cta={handleUserLogin()}
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
              {renderTicketCounter()}
            </Text>
            {ticketIcon()}
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
