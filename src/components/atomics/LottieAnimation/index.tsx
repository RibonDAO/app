import Lottie, { AnimationObject } from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleProp } from "react-native";

export type Props = {
  animationData: string | AnimationObject;
  width: number | string;
  height: number;
  speed?: number;
  style?: StyleProp<any>;
  startFrame?: number;
  endFrame?: number;
};

function LottieAnimation({
  animationData,
  width,
  height,
  style,
  speed,
  startFrame,
  endFrame,
}: Props): JSX.Element {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    if (startFrame && endFrame)
      animationRef.current?.play(startFrame, endFrame);
  }, []);

  const handleAnimationEnd = () => {
    if (startFrame && endFrame) animationRef.current?.play(0, endFrame);
  };
  return (
    <Lottie
      loop={!(startFrame && endFrame)}
      autoPlay={!(startFrame && endFrame)}
      source={animationData}
      style={{ width, height, ...style }}
      ref={animationRef}
      onAnimationFinish={handleAnimationEnd}
      speed={speed}
    />
  );
}

export default LottieAnimation;
