import { Text, View, Platform } from "react-native";
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
  hasBackdrop?: boolean;
  backdropOpacity?: number;
};

function BlankModal({
  title,
  visible,
  setVisible,
  children,
  onModalHide,
  containerStyle,
  hasBackdrop = true,
  backdropOpacity = 0.5,
}: Props): JSX.Element {
  function toggleModal() {
    setVisible(!visible);
  }

  // Modal is crashing on Android 13 when animationInTiming and animationOutTiming are set
  const iosProps =
    Platform.OS === "ios"
      ? { animationInTiming: 200, animationOutTiming: 200 }
      : {};

  function renderModal() {
    return (
      <Modal
        isVisible={visible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        hasBackdrop={hasBackdrop}
        backdropOpacity={backdropOpacity}
        onBackdropPress={toggleModal}
        onModalHide={onModalHide}
        {...iosProps}
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
