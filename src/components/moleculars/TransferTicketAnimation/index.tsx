import { Dimensions, View, Text } from "react-native";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import S from "./styles";

type Props = {
  onAnimationEnd: () => void;
  senderIcon?: JSX.Element;
  receiverIcon?: JSX.Element;
  description?: string;
  receiverText?: string | null;
  senderText?: string | null;
};

function TransferTicketAnimation({
  onAnimationEnd,
  senderIcon,
  receiverIcon,
  description,
  receiverText,
  senderText,
}: Props): JSX.Element {
  const ANIMATION_TIME = 4000;
  const left = useSharedValue(20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onAnimationEnd();
    }, ANIMATION_TIME);

    return () => clearTimeout(timeout);
  }, [onAnimationEnd]);

  useEffect(() => {
    left.value = withTiming(Dimensions.get("window").width - 150, {
      duration: ANIMATION_TIME,
    });
    opacity.value = withTiming(1, { duration: ANIMATION_TIME });
  }, []);

  const boxStyle = useAnimatedStyle(() => ({
    left: left.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={S.containerColumn}>
      <View style={S.containerRow}>
        <View style={S.diamond}>
          <View style={S.diamondImage}>{senderIcon}</View>
        </View>

        <View style={{ overflow: "hidden", height: 2 }}>
          <View style={S.stripedLine} />
        </View>

        <Animated.View style={[S.ticketRoundBox, boxStyle]}>
          <TicketWhiteIcon />
        </Animated.View>

        <View style={S.diamond}>
          <View style={S.diamondImage}>{receiverIcon}</View>
        </View>
      </View>
      <View style={S.textContainer}>
        <Text style={S.diamondText}>{senderText}</Text>
        <Text style={S.diamondText}>{receiverText}</Text>
      </View>
      <Animated.Text style={[S.text, textStyle]}>{description}</Animated.Text>
    </View>
  );
}

export default TransferTicketAnimation;
