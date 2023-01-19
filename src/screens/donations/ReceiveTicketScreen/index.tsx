
import Button from "components/atomics/buttons/Button";
import { Text, View } from "components/Themed";
import RibonBackgroundLogo from "components/vectors/RibonBackgroundLogo";
import { useState } from "react";
import AnimationModal from "../ReceiveTicketScreen/AnimationModal";
import S from "./styles";

function ReceiveTicketScreen(): JSX.Element {
  const [animationModalVisible, setAnimationModalVisible] = useState(false);

  function renderAnimationModal() {
    return <AnimationModal
      visible={animationModalVisible}
      setVisible={setAnimationModalVisible}
    />
  }

  function toggleAnimationModal() {
    setAnimationModalVisible(!animationModalVisible);
  }

  return (
    <View style={S.container}>
      <View style={S.icon}>
        <RibonBackgroundLogo />
      </View>

      <Text style={S.title}>Doar juntos para mudar vidas!</Text>

      <Text style={S.description}>Você tem um ticket para receber</Text>

      <Button text="Receber ticket" onPress={toggleAnimationModal} />

      {renderAnimationModal()}
    </View>
  );
}

export default ReceiveTicketScreen;
