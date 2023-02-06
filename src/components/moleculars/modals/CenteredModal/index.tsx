import Button from "components/atomics/buttons/Button";
import { Text, View } from "react-native";
import DangerIcon from "components/vectors/DangerIcon";
import Modal from "react-native-modal";
import S from "./styles";

type Props = {
  title: string;
  icon: JSX.Element;
  buttonText: string;
  description: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  primaryButtonClick: () => void;
};

function CenteredModal({
  title,
  icon,
  buttonText,
  description,
  visible,
  setVisible,
  primaryButtonClick,
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
      >
        <View style={S.container}>
          <View style={S.icon}>{icon}</View>
          <Text style={S.title}>{title}</Text>
          <Text style={S.description}>{description}</Text>
          <Button text={buttonText} onPress={primaryButtonClick} />
        </View>
      </Modal>
    );
  }

  return renderModal();
}

export default CenteredModal;
