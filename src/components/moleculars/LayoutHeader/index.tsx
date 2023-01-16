
import { useCurrentUser } from "contexts/currentUserContext";
import { useState } from "react";
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
import ChooseCauseModal from "./ChooseCauseModal";
import { useCanDonate } from "@ribon.io/shared";
import useVoucher from "hooks/useVoucher";
import TicketIcon from "components/vectors/TicketIcon";

function LayoutHeader(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [causesModalVisible, setCausesModalVisible] = useState(false);
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { canDonate } = useCanDonate(2);
  const { isVoucherAvailable } = useVoucher();
  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  function toggleModal() {
    setMenuVisible(!menuVisible);
  };

  function logUserOut() {
    logoutCurrentUser();
    toggleModal();
  };

  function logButton() {
    return currentUser ?
      <RoundButton active={false} text="Sair" onPress={logUserOut} />
      : <RoundButton text="Doar" onPress={toggleModal} />
  }

  function toggleTicketModal() {
    setTicketModalVisible(!ticketModalVisible);
  };

  function renderTicketModal() {
    return <TicketModal visible={ticketModalVisible} setVisible={setTicketModalVisible} />
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
          <View style={S.configItem}>
            <View style={S.iconContainer}>
              <GlobeIcon />
            </View>
            <View style={S.textContainer}>
              <Text style={S.text}>Alterar idioma</Text>
            </View>
            <View style={S.ctaContainer}>
              <ChangeLanguageItem />
            </View>
          </View>
          <View style={S.configItem}>
            <View style={S.iconContainer}>
              <SupportIcon />
            </View>
            <View style={S.textContainer}>
              <Text style={S.text}>Suporte ao Usuário</Text>
            </View>
            <View style={S.ctaContainer}>
              <RoundButton text="Suporte" onPress={linkToSupport} />
            </View>
          </View>
          <View style={S.configItem}>
            <View style={S.iconContainer}>
              <LetterIcon />
            </View>
            <View style={S.textContainer}>
              <Text style={S.text}>{currentUser ? currentUser?.email : "Fazer login"}</Text>
            </View>
            <View style={S.ctaContainer}>
              {logButton()}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={S.configContainer}>
      <TouchableOpacity style={S.container} onPress={toggleTicketModal}>
        <View style={S.ticketSection}>
          <Text style={S.ticketCounter}>{canDonateAndHasVoucher ? 1 : 0}</Text>
          <TicketIcon />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={S.container} onPress={toggleModal}>
        <CogIcon />
      </TouchableOpacity>

      {renderTicketModal()}

      {renderCausesModal()}

      {renderConfigModal()}
    </View>
  );
}

export default LayoutHeader;
