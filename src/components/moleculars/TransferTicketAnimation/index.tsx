import { Dimensions, View, Text } from "react-native";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import * as Animatable from "react-native-animatable";
import { useEffect } from "react";
import S from "./styles";

type Props = {
  onAnimationEnd: () => void;
  senderIcon?: JSX.Element;
  receiverIcon?: JSX.Element;
  description?: string;
  receiverText?: string | null;
  senderText?: string | null;
};

const boxAnimation = {
  from: {
    left: 20,
  },
  to: {
    left: Dimensions.get("window").width - 150,
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

function TransferTicketAnimation({
  onAnimationEnd,
  senderIcon,
  receiverIcon,
  description,
  receiverText,
  senderText,
}: Props): JSX.Element {
  const ANIMATION_TIME = 3000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd();
    }, ANIMATION_TIME);

    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  return (
    <View style={S.containerColumn}>
      <View style={S.containerRow}>
        <View style={S.diamond}>
          <View style={S.diamondImage}>{senderIcon}</View>
        </View>

        <View style={{ overflow: "hidden", height: 2 }}>
          <View style={S.stripedLine} />
        </View>

        <Animatable.View
          animation={boxAnimation}
          duration={ANIMATION_TIME}
          style={S.ticketRoundBox}
        >
          <TicketWhiteIcon />
        </Animatable.View>

        <View style={S.diamond}>
          <View style={S.diamondImage}>{receiverIcon}</View>
        </View>
      </View>
      <View style={S.textContainer}>
        <Text style={S.diamondText}>{senderText}</Text>
        <Text style={S.diamondText}>{receiverText}</Text>
      </View>
      <Animatable.Text
        animation={fadeIn}
        duration={ANIMATION_TIME}
        style={S.text}
      >
        {description}
      </Animatable.Text>
    </View>
  );
}

export default TransferTicketAnimation;
