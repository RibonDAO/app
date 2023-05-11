import Button from "components/atomics/buttons/Button";
import { Text, View } from "react-native";
import RibonBackgroundLogo from "components/vectors/RibonBackgroundLogo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import SupportersIcon from "components/vectors/SupportersIcon";
import UserIcon from "components/vectors/UserIcon";
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

  return (
    <View style={S.container}>
      {animationVisible ? (
        <TransferTicketAnimation
          onAnimationEnd={() => {
            setTimeout(() => {
              setAnimationVisible(false);
            }, 500);
            onTicketReceived();
          }}
          senderIcon={<SupportersIcon />}
          receiverIcon={<UserIcon />}
          description={t("animationText").toString()}
        />
      ) : (
        <>
          <View style={S.icon}>
            <RibonBackgroundLogo />
          </View>

          <Text style={S.title}>{t("title")}</Text>

          <Text style={S.description}>{t("description")}</Text>

          <Button
            customStyles={S.button}
            text={t("buttonText")}
            onPress={openAnimation}
          />
        </>
      )}
    </View>
  );
}

export default ReceiveTicketScreen;
