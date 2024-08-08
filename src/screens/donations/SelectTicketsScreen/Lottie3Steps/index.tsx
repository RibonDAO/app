import Animated, { Keyframe } from "react-native-reanimated";
import Lottie from "lottie-react-native";
import step1 from "./assets/STEP1.json";
import step2 from "./assets/STEP2.json";
import step3 from "./assets/STEP3.json";
import * as S from "./styles";

export type Props = {
  rangeSize: number;
  step: number;
  value: number;
};

const DURATION = 300;

const enteringKeyframes = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ scale: 0 }],
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
});

const exitingKeyframes = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  100: {
    opacity: 0,
    transform: [{ scale: 0 }],
  },
});

export default function Lottie3Steps({
  rangeSize,
  value,
  step,
}: Props): JSX.Element {
  // Range is not able to move. Ex: step = 4, rangeSize = 5
  const locked = step * 2 > rangeSize;

  const percent = locked ? 70 : ((value - step) / (rangeSize - step)) * 100;

  const renderLottie = (source: any) => (
    <Animated.View
      entering={enteringKeyframes.duration(DURATION)}
      exiting={exitingKeyframes.duration(DURATION)}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <Lottie
        source={source}
        style={{ width: 360, height: 360 }}
        loop={false}
        autoPlay
      />
    </Animated.View>
  );

  return (
    <S.Container>
      {percent >= 5 && renderLottie(step1)}
      {percent >= 55 && renderLottie(step2)}
      {percent >= 95 && renderLottie(step3)}
    </S.Container>
  );
}
