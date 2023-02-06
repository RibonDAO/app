import { Text, View } from "react-native";
import Modal from "react-native-modal";
import { ViewStyle } from "react-native";
import S from "./styles";

type Props = {
  title?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onModalHide?: () => void;
  children: JSX.Element;
  containerStyle?: ViewStyle;
};

function BlankModal({
  title,
  visible,
  setVisible,
  children,
  onModalHide,
  containerStyle,
}: Props): JSX.Element {
  function toggleModal() {
    setVisible(!visible);
  }

  function renderModal() {
    return (
      <Modal
        isVisible={visible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={200}
        animationOutTiming={200}
        hasBackdrop
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}
        onModalHide={onModalHide}
      >
        <View style={[S.container, containerStyle]}>
          {title && <Text style={S.title}>{title}</Text>}
          {children}
        </View>
      </Modal>
    );
  }

  return renderModal();
}

export default BlankModal;
