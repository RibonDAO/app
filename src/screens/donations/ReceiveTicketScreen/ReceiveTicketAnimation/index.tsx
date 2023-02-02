import { View } from "react-native";
import SupportersIcon from "components/vectors/SupportersIcon";
import UserIcon from "components/vectors/UserIcon";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import * as Animatable from "react-native-animatable";
import { useTranslation } from "react-i18next";

import S from "./styles";

type Props = {
  onAnimationEnd: () => void;
};

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

function ReceiveTicketAnimation({ onAnimationEnd }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.receiveTicketScreen.animationModal",
  });

  return (
    <View style={S.containerColumn}>
      <View style={S.containerRow}>
        <View style={S.diamond}>
          <View style={S.diamondImage}>
            <SupportersIcon />
          </View>
        </View>

        <View style={{ overflow: "hidden" }}>
          <View style={S.stripedLine} />
        </View>

        <Animatable.View
          animation={boxAnimation}
          duration={4000}
          style={S.ticketRoundBox}
        >
          <TicketWhiteIcon />
        </Animatable.View>

        <View style={S.diamond}>
          <View style={S.diamondImage}>
            <UserIcon />
          </View>
        </View>
      </View>

      <Animatable.Text
        animation={fadeIn}
        duration={4000}
        style={S.text}
        onAnimationEnd={onAnimationEnd}
      >
        {t("text")}
      </Animatable.Text>
    </View>
  );
}

export default ReceiveTicketAnimation;
