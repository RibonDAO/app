import Button from "components/atomics/buttons/Button";
import { Text, View } from "components/Themed";
import Modal from "react-native-modal";
import S from "./styles";

type Props = {
  title: string;
  buttonText: string;
  description: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  primaryButtonClick: () => void;
};

function BottomModal({
  title,
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
        animationIn="slideInRight"
        hasBackdrop
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}
      >
        <View style={S.container}>
          <Text style={S.title}>{title}</Text>
          <Text style={S.description}>{description}</Text>
          <Button text={buttonText} onPress={primaryButtonClick} />
        </View>
      </Modal>
    );
  }

  return renderModal();
}

export default BottomModal;
