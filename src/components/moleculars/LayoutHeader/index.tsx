
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect, useState } from "react";
import { Text, View } from "components/Themed";
import CogIcon from "components/vectors/CogIcon";
import GlobeIcon from "components/vectors/GlobeIcon";
import SupportIcon from "components/vectors/SupportIcon";
import LetterIcon from "components/vectors/LetterIcon";
import { TouchableOpacity, Linking } from "react-native";
import Modal from "react-native-modal"
import S from "./styles";
import ChangeLanguageItem from "./ChangeLanguageItem";
import RoundButton from "components/atomics/RoundButton";
import TicketModal from "./TicketModal";
import BlockedDonationModal from "./BlockedDonationModal";
import ChooseCauseModal from "./ChooseCauseModal";
import { useCanDonate } from "@ribon.io/shared";
import useVoucher from "hooks/useVoucher";
import TicketIcon from "components/vectors/TicketIcon";
import ConfigItem from "./ConfigItem";
import { useNavigation } from "hooks/useNavigation";

function LayoutHeader(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [blockedDonationModalVisible, setBlockedDonationModalVisible] = useState(false);
  const [causesModalVisible, setCausesModalVisible] = useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { canDonate } = useCanDonate(2);
  const { isVoucherAvailable, createVoucher, getTicket } = useVoucher();
  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();


  useEffect(() => {
    console.log(getTicket());
  }, [getTicket])

  function toggleModal() {
    setMenuVisible(!menuVisible);
  };

  function handleLogout() {
    logoutCurrentUser();
    createVoucher();
    navigateTo("/");
    toggleModal();
  }

  function handleUserLogin() {
    return currentUser ?
      <RoundButton active={false} text="Sair" onPress={handleLogout} />
      : <RoundButton text="Doar" onPress={toggleModal} />
  }

  function toggleTicketModal() {
    setTicketModalVisible(!ticketModalVisible);
  };

  function toggleBlockedDonationModal() {
    setBlockedDonationModalVisible(!ticketModalVisible);
  };

  function renderTicketModal() {
    return <TicketModal visible={ticketModalVisible} setVisible={setTicketModalVisible} />
  }

  function renderBlockedDonationModal() {
    return <BlockedDonationModal visible={blockedDonationModalVisible} setVisible={setBlockedDonationModalVisible} />
  }

  function handleTicketClick() {
    if (canDonateAndHasVoucher) {
      toggleTicketModal();
    }
    else {
      toggleBlockedDonationModal();
    }
  }

  function renderCausesModal() {
    return <ChooseCauseModal visible={causesModalVisible} setVisible={setCausesModalVisible} />
  }

  function linkToSupport() {
    Linking.openURL("https://google.com");
  }

  function renderConfigModal() {
    return (
      <Modal
        isVisible={menuVisible}
        animationIn="slideInRight"
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
      <TouchableOpacity style={S.container} onPress={handleTicketClick}>
        <View style={S.ticketSection}>
          <Text style={S.ticketCounter}>{canDonateAndHasVoucher ? 1 : 0}</Text>
          <TicketIcon />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={S.container} onPress={toggleModal}>
        <CogIcon />
      </TouchableOpacity>

      {renderTicketModal()}

      {renderBlockedDonationModal()}

      {renderCausesModal()}

      {renderConfigModal()}
    </View>
  );
}

export default LayoutHeader;
