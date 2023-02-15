import Lottie, { AnimationObject } from "lottie-react-native";
import { StyleProp } from "react-native";

export type Props = {
  animationData: string | AnimationObject;
  width: number;
  height: number;
  style?: StyleProp<any>;
};

function LottieAnimation({
  animationData,
  width,
  height,
  style,
}: Props): JSX.Element {
  return (
    <Lottie
      loop
      autoPlay
      source={animationData}
      style={{ width, height, ...style }}
      testID="loader"
    />
  );
}

export default LottieAnimation;
