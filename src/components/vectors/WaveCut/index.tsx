import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
};
function WaveCut({ width = 296, height = 136 }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 296 136"
      fill="none"
      preserveAspectRatio="none"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 0C3.58172 0 0 3.58172 0 8V133.908C27.7549 130.936 54.6109 124.852 80.2325 116C117.695 128.943 157.797 135.969 199.49 136L0 136H296L200.044 136C233.212 135.975 265.373 131.523 296 123.188V8C296 3.58172 292.418 0 288 0H8Z"
        fill="white"
      />
    </Svg>
  );
}

export default WaveCut;
