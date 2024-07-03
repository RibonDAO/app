import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react-native";
import { View } from "react-native";
import TicketAmountStepper from "./assets/ticketAmountStepper.json";

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

export default function LottieStepper({
  rangeSize,
  value,
  step,
}: Props): JSX.Element {
  const animationRef = useRef<Lottie>(null);

  function repeatElements(array: number[][], x: number) {
    return array.flatMap((element) => Array(x).fill(element));
  }

  const buildSegmentPaths = () => {
    const TOTAL_FRAMES = 150;
    const totalSegments = Math.ceil((rangeSize - step) / step) + 1;
    const segmentSize =
      totalSegments > TOTAL_FRAMES
        ? 1
        : Math.floor(TOTAL_FRAMES / totalSegments);
    const repeatSize = Math.ceil(totalSegments / TOTAL_FRAMES);

    const segmentsPaths = Array.from(
      { length: totalSegments > TOTAL_FRAMES ? TOTAL_FRAMES : totalSegments },
      (_, index) => {
        const startFrame = index * segmentSize;
        const endFrame = startFrame + segmentSize;

        return [startFrame || 1, endFrame];
      },
    );

    return totalSegments > TOTAL_FRAMES
      ? repeatElements(segmentsPaths, repeatSize)
      : segmentsPaths;
  };

  const segmentsPaths = buildSegmentPaths();

  const [currentSegment, setCurrentSegment] = useState<Segment>({
    index: 0,
    path: segmentsPaths[0],
    direction: "forward",
  });

  useEffect(() => {
    const direction = value > currentSegment.index ? "forward" : "backward";
    const segmentIndex =
      Math.floor(value / step) - (direction === "forward" ? 1 : 0);

    setCurrentSegment({
      index: segmentIndex,
      path: segmentsPaths[segmentIndex],
      direction,
    });
  }, [value]);

  useEffect(() => {
    if (currentSegment.direction === "forward") {
      animationRef.current?.play(
        currentSegment.path[0],
        currentSegment.path[1],
      );
    } else {
      animationRef.current?.play(
        currentSegment.path[1],
        currentSegment.path[0],
      );
    }
  }, [currentSegment]);

  return (
    <View>
      <Lottie
        source={TicketAmountStepper}
        style={{ width: 200, height: 200 }}
        ref={animationRef}
        loop={false}
      />
    </View>
  );
}
