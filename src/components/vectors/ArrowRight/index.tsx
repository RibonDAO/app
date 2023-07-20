import * as React from "react";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};
function ArrowRight({ height = 24, width = 24, color = "none" }: Props) {
  return (
    <Svg width={24} height={24} fill="none">
      <Mask
        id="mask0_3478_24736"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <Rect width={width} height={height} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_3478_24736)">
        <Path
          d="M8.0251 21.65L6.6001 20.225L14.8251 12L6.6001 3.77498L8.0251 2.34998L17.6751 12L8.0251 21.65Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default ArrowRight;
