import { Dimensions } from "react-native";
import Animated, {
  Easing,
  Keyframe,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import * as S from "./styles";

export function LockedButton({
  colors,
  text,
}: {
  colors: string[];
  text: string;
}) {
  return (
    <S.Container disabled>
      <S.MainContainer color={colors[4]}>
        <S.Text color={colors[0]}>{text}</S.Text>
        <Icon type="outlined" name="check" size={24} color={colors[0]} />
      </S.MainContainer>
    </S.Container>
  );
}

export function TextAnimation({ text }: { text: string }) {
  const textKeyFrames = () =>
    new Keyframe({
      0: {
        opacity: 1,
        transform: [{ translateX: 0 }],
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      },
      100: {
        opacity: 0,
        transform: [{ translateX: Dimensions.get("window").width }],
      },
    });

  return (
    <Animated.View exiting={textKeyFrames().duration(300)}>
      <S.TextContainerAnimated>
        <Icon
          type="outlined"
          name="confirmation_number"
          size={24}
          color={theme.colors.neutral10}
        />
        <S.Text>{text}</S.Text>
      </S.TextContainerAnimated>
    </Animated.View>
  );
}

export function AfterTextAnimation({
  colors,
  text,
}: {
  colors: string[];
  text: string;
}) {
  const textKeyFrames = () =>
    new Keyframe({
      0: {
        opacity: 0,
        transform: [{ translateX: -Dimensions.get("window").width }],
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      },
      100: {
        opacity: 1,
        transform: [{ translateX: 0 }],
      },
    });

  return (
    <Animated.View entering={textKeyFrames().duration(200).delay(100)}>
      <S.TextContainerAnimated>
        <S.Text color={colors[0]}>{text}</S.Text>
        <Icon type="outlined" name="check" size={24} color={colors[0]} />
      </S.TextContainerAnimated>
    </Animated.View>
  );
}

export function BackgroundLayersAnimation({ colors }: { colors: string[] }) {
  const layerKeyframes = () =>
    new Keyframe({
      0: {
        opacity: 1,
        transform: [{ translateX: -Dimensions.get("window").width }],
        easing: Easing.bezierFn(0.02, 0.85, 1, 0.9),
      },
      100: {
        opacity: 1,
        transform: [{ translateX: 0 }],
      },
    });

  const animatedViewStyle = useAnimatedStyle(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    }));

  const durations = [300, 300, 300, 300];
  const delays = [0, 100, 200, 350];
  const colorsExceptFirst = colors.slice(1);

  return colorsExceptFirst.map((color, index) => (
    <Animated.View
      key={color}
      entering={layerKeyframes()
        .duration(durations[index])
        .delay(delays[index])}
      style={[animatedViewStyle, { backgroundColor: color }]}
    />
  ));
}
