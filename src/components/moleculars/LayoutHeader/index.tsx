
import { useCurrentUser } from "contexts/currentUserContext";
import { useState } from "react";
import { Text, View } from "components/Themed";
import CogIcon from "components/vectors/CogIcon";
import GlobeIcon from "components/vectors/GlobeIcon";
import SupportIcon from "components/vectors/SupportIcon";
import LetterIcon from "components/vectors/LetterIcon";
import { TouchableHighlight } from "react-native";
import Modal from "react-native-modal"
import S from "./styles";
import ChangeLanguageItem from "./ChangeLanguageItem";
import RoundButton from "components/atomics/RoundButton";

function LayoutHeader(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser, logoutCurrentUser } = useCurrentUser();

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
            <SupportIcon />
            <Text style={S.text}>Suporte ao Usuário</Text>
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
    <>
      <TouchableHighlight style={S.container} onPress={toggleModal}>
        <CogIcon />
      </TouchableHighlight>

      {renderConfigModal()}
    </>
  );
}

export default LayoutHeader;
