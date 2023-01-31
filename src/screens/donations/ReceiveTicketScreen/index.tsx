import Button from "components/atomics/buttons/Button";
import { Text, View } from "components/Themed";
import RibonBackgroundLogo from "components/vectors/RibonBackgroundLogo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AnimationModal from "./ReceiveTicketAnimation";
import S from "./styles";

type Props = {
  onTicketReceived: () => void;
};
function ReceiveTicketScreen({ onTicketReceived }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketScreen",
  });
  const [animationVisible, setAnimationVisible] = useState(false);

  const openAnimation = () => {
    setAnimationVisible(true);
  };

  return animationVisible ? (
    <AnimationModal
      onAnimationEnd={() => {
        setAnimationVisible(false);
        onTicketReceived();
      }}
    />
  ) : (
    <View style={S.container}>
      <View style={S.icon}>
        <RibonBackgroundLogo />
      </View>

      <Text style={S.title}>{t("title")}</Text>

      <Text style={S.description}>{t("description")}</Text>

      <Button text={t("buttonText")} onPress={openAnimation} />
    </View>
  );
}

export default ReceiveTicketScreen;
