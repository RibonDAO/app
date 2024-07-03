import { useEffect, useRef, useState } from "react";
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

type Segment = {
  index: number;
  path: number[];
  direction: "forward" | "backward";
};

export default function Lottie3Steps({
  rangeSize,
  value,
  step,
}: Props): JSX.Element {
  const animationRef1 = useRef<Lottie>(null);
  const animationRef2 = useRef<Lottie>(null);
  const animationRef3 = useRef<Lottie>(null);

  const minimumValue = step;
  const maximumValue = Math.floor(rangeSize / step) * step;

  const removeDups = (arr: number[]): number[] => [...new Set(arr)];

  const steps = removeDups([
    minimumValue,
    Math.floor(maximumValue / 3) % step !== 0
      ? minimumValue
      : Math.floor(maximumValue / 3),
    Math.floor((2 * maximumValue) / 3) % step !== 0
      ? minimumValue
      : Math.floor((2 * maximumValue) / 3),
    maximumValue,
  ]);

  const [currentSegment, setCurrentSegment] = useState<Segment>({
    index: 0,
    path: [0, 150],
    direction: "forward",
  });

  useEffect(() => {
    animationRef1.current?.reset();
    animationRef2.current?.reset();
    animationRef3.current?.reset();
  }, []);

  useEffect(() => {
    const direction = value > currentSegment.index ? "forward" : "backward";

    setCurrentSegment({
      index: value,
      path: [0, 150],
      direction,
    });
  }, [value]);

  const handle4Steps = () => {
    if (value === steps[0]) {
      if (currentSegment.direction === "backward") {
        animationRef1.current?.play(0, 0);
        animationRef2.current?.play(0, 0);
        animationRef3.current?.play(0, 0);
      }
    }
    if (value === steps[1]) {
      if (currentSegment.direction === "forward")
        animationRef1.current?.play(0, 150);
      else {
        animationRef2.current?.play(0, 0);
      }
    }
    if (value > steps[1] && value < steps[2]) {
      if (currentSegment.direction === "forward")
        animationRef1.current?.play(149, 150);
      else animationRef2.current?.play(0, 0);
    }
    if (value === steps[2]) {
      if (currentSegment.direction === "forward")
        animationRef2.current?.play(0, 150);
      else animationRef2.current?.play(0, 0);
    }
    if (value > steps[2] && value < steps[3]) {
      if (currentSegment.direction === "forward")
        animationRef2.current?.play(149, 150);
      else animationRef3.current?.play(0, 0);
    }
    if (value === steps[3]) {
      if (currentSegment.direction === "forward") {
        animationRef1.current?.play(149, 150);
        animationRef2.current?.play(149, 150);
        animationRef3.current?.play(0, 150);
      }
    }
  };
  const handle3Steps = () => {
    if (value === steps[0])
      if (currentSegment.direction === "backward") {
        animationRef1.current?.play(0, 0);
        animationRef2.current?.play(0, 0);
      }

    if (value === steps[1]) {
      if (currentSegment.direction === "forward")
        animationRef1.current?.play(0, 150);
      else animationRef2.current?.play(0, 0);
    }
    if (value > steps[1] && value < steps[2]) {
      if (currentSegment.direction === "forward")
        animationRef1.current?.play(149, 150);
      else animationRef2.current?.play(0, 0);
    }
    if (value === steps[2]) {
      if (currentSegment.direction === "forward") {
        animationRef1.current?.play(149, 150);
        animationRef2.current?.play(0, 150);
      }
    }
  };

  const handle2Steps = () => {
    if (value === steps[0]) {
      if (currentSegment.direction === "backward")
        animationRef1.current?.play(0, 0);
    }
    if (value === steps[1]) {
      if (currentSegment.direction === "forward")
        animationRef1.current?.play(0, 150);
    }
  };

  useEffect(() => {
    switch (steps.length) {
      case 4:
        return handle4Steps();
      case 3:
        return handle3Steps();
      case 2:
        return handle2Steps();
      default:
        return handle2Steps();
    }
  }, [currentSegment]);

  return (
    <S.container>
      <S.lottieContainer>
        <Lottie
          source={step1}
          style={{ width: 360, height: 360 }}
          ref={animationRef1}
          loop={false}
          autoPlay={false}
        />
      </S.lottieContainer>
      <S.lottieContainer>
        <Lottie
          source={step2}
          style={{ width: 360, height: 360 }}
          ref={animationRef2}
          loop={false}
          autoPlay={false}
        />
      </S.lottieContainer>
      <S.lottieContainer>
        <Lottie
          source={step3}
          style={{ width: 360, height: 360 }}
          ref={animationRef3}
          loop={false}
          autoPlay={false}
        />
      </S.lottieContainer>
    </S.container>
  );
}
