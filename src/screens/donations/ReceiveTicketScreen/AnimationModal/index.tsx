
import BlankModal from "components/moleculars/modals/BlankModal";
import { View } from "components/Themed";
import SupportersIcon from "components/vectors/SupportersIcon";
import UserIcon from "components/vectors/UserIcon";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import * as Animatable from "react-native-animatable";
import S from "./styles";
import { useEffect, useState } from "react";
import ChooseCauseModal from "../../ChooseCauseScreen";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const boxAnimation = {
  from: {
    left: 20,
  },
  to: {
    left: 220,
  },
};

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

function AnimationModal({ visible, setVisible }: Props): JSX.Element {
  const { navigateTo } = useNavigation();

  function handleModalHide() {
    navigateTo("ChooseCauseScreen");
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  }, []);

  function renderModal() {
    return (
      <BlankModal
        visible={visible}
        setVisible={setVisible}
        onModalHide={handleModalHide}
      >
        <View style={S.containerColumn}>
          <View style={S.containerRow}>
            <View style={S.diamond}>
              <View style={S.diamondImage}>
                <SupportersIcon />
              </View>
            </View>

            <View style={{ overflow: "hidden" }}>
              <View style={S.stripedLine}></View>
            </View>

            <Animatable.View animation={boxAnimation} duration={4000} style={S.ticketRoundBox}>
              <TicketWhiteIcon />
            </Animatable.View>

            <View style={S.diamond}>
              <View style={S.diamondImage}>
                <UserIcon />
              </View>
            </View>
          </View>

          <Animatable.Text animation={fadeIn} duration={4000} style={S.text}>Recebendo ticket</Animatable.Text>
        </View>
      </BlankModal>
    );
  }

  return renderModal();
}

export default AnimationModal;
