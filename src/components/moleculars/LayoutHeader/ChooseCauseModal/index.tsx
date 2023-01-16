
import BlankModal from "components/moleculars/modals/BlankModal";
import { ImageBackground, TouchableOpacity } from "react-native";
import S from "./styles";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function ChooseCauseModal({ visible, setVisible }: Props): JSX.Element {
  function renderModal() {
    return (
      <BlankModal
        title="Escolha uma causa"
        visible={visible}
        setVisible={setVisible}
      >
        <>
          <TouchableOpacity style={S.imageContainer}>
            <ImageBackground style={S.imageBackground} source={require("../../../../assets/images/causes/support-image.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={S.imageContainer}>
            <ImageBackground style={S.imageBackground} source={require("../../../../assets/images/causes/support-image.png")} />
          </TouchableOpacity>
        </>
      </BlankModal>
    );
  }

  return renderModal();
}

export default ChooseCauseModal;
