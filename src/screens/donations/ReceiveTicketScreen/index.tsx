import Button from "components/atomics/buttons/Button";
import { Text, View } from "components/Themed";
import RibonBackgroundLogo from "components/vectors/RibonBackgroundLogo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AnimationModal from "../ReceiveTicketScreen/AnimationModal";
import S from "./styles";

function ReceiveTicketScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketScreen",
  });
  const [animationModalVisible, setAnimationModalVisible] = useState(false);

  function renderAnimationModal() {
    return (
      <AnimationModal
        visible={animationModalVisible}
        setVisible={setAnimationModalVisible}
      />
    );
  }

  function toggleAnimationModal() {
    setAnimationModalVisible(!animationModalVisible);
  }

  return (
    <View style={S.container}>
      <View style={S.icon}>
        <RibonBackgroundLogo />
      </View>

      <Text style={S.title}>{t("title")}</Text>

      <Text style={S.description}>{t("description")}</Text>

      <Button text={t("buttonText")} onPress={toggleAnimationModal} />

      {renderAnimationModal()}
    </View>
  );
}

export default ReceiveTicketScreen;
