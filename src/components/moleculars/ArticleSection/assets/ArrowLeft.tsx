import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function ArrowLeft() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Mask
        id="a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <Path fill="#D9D9D9" d="M0 0H20V20H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M12 14l-1.062-1.062 2.187-2.188H4v-1.5h9.125l-2.187-2.188L12 6l4 4-4 4z"
          fill="#802600"
        />
      </G>
    </Svg>
  );
}

export default ArrowLeft;
