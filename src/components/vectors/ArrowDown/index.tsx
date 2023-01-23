import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};
function ArrowDown({ height = 24, width = 24, color = "none" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Path
        d="M5.88 7L12 13.1067L18.12 7L20 8.88L12 16.88L4 8.88L5.88 7Z"
        fill={color}
      />
    </Svg>
  );
}

export default ArrowDown;
