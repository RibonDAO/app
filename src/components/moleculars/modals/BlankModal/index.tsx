
import { Text, View } from "components/Themed";
import Modal from "react-native-modal";
import S from "./styles";

type Props = {
  title?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onModalHide?: () => void;
  children: JSX.Element;
}

function BlankModal({ title, visible, setVisible, children, onModalHide }: Props): JSX.Element {
  function toggleModal() {
    setVisible(!visible);
  };

  function renderModal() {
    return (
      <Modal
        isVisible={visible}
        animationIn="slideInRight"
        hasBackdrop
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}
        onModalHide={onModalHide}
      >
        <View style={S.container}>
          {title && <Text style={S.title}>{title}</Text>}
          {children}
        </View>
      </Modal>
    );
  }

  return renderModal();
}

export default BlankModal;
