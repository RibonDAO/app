import { StyleProp } from "react-native";
import LottieAnimation from "../LottieAnimation";
import animationData from "./loader.json";

export type Props = {
  width: number;
  height: number;
  speed?: number;
  style?: StyleProp<any>;
};

function LoaderAnimated({
  width,
  height,
  style,
  speed = 1,
}: Props): JSX.Element {
  return (
    <LottieAnimation
      animationData={animationData}
      style={{ ...style }}
      height={height}
      width={width}
      speed={speed}
    />
  );
}

export default LoaderAnimated;
