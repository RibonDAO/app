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

// Passing 250 tickets, the animation will be completed
const MAX_TICKETS_TO_COMPLETE = 250;

export default function Lottie3Steps({
  rangeSize,
  value,
  step,
}: Props): JSX.Element {
  const adjustedRangeSize = Math.min(rangeSize, MAX_TICKETS_TO_COMPLETE) - step;
  const rangeIsLocked = step * 2 > rangeSize;

  const rangePercentage = rangeIsLocked
    ? 70
    : ((value - step) / adjustedRangeSize) * 100;

  const layer1Visible = rangePercentage >= 5;
  const layer2Visible = rangePercentage >= 50;
  const layer3Visible = rangePercentage >= 95;

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

  return (
    <S.Container>
      {layer1Visible && (
        <Animated.View
          entering={enteringKeyframes.duration(DURATION)}
          exiting={exitingKeyframes.duration(DURATION)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Lottie
            source={step1}
            style={{ width: 360, height: 360 }}
            loop={false}
            autoPlay
          />
        </Animated.View>
      )}

      {layer2Visible && (
        <Animated.View
          entering={enteringKeyframes.duration(DURATION)}
          exiting={exitingKeyframes.duration(DURATION)}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <Lottie
            source={step2}
            style={{ width: 360, height: 360 }}
            loop={false}
            autoPlay
          />
        </Animated.View>
      )}

      {layer3Visible && (
        <Animated.View
          entering={enteringKeyframes.duration(DURATION)}
          exiting={exitingKeyframes.duration(DURATION)}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <Lottie
            source={step3}
            style={{ width: 360, height: 360 }}
            loop={false}
            autoPlay
          />
        </Animated.View>
      )}
    </S.Container>
  );
}
