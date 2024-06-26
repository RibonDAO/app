import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";

function ImpactIconOff() {
  return (
    <Svg width={24} height={24} fill="none">
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M8.8 21.875 7.025 18.85l-3.375-.725.325-3.5L1.675 12l2.3-2.625-.325-3.5 3.375-.725L8.8 2.125 12 3.5l3.2-1.375 1.775 3.025 3.375.725-.325 3.5 2.3 2.625-2.3 2.625.325 3.5-3.375.725-1.775 3.025L12 20.5l-3.2 1.375Zm.65-1.925L12 18.875l2.575 1.075L16 17.55l2.75-.625-.25-2.825 1.85-2.1-1.85-2.125.25-2.825-2.75-.6-1.45-2.4L12 5.125 9.425 4.05 8 6.45l-2.75.6.25 2.825L3.65 12l1.85 2.1-.25 2.85 2.75.6 1.45 2.4Zm1.5-4.75 5.3-5.3-1.05-1.075-4.25 4.25L8.8 10.95 7.75 12l3.2 3.2Z"
          fill="#867F70"
        />
      </G>
    </Svg>
  );
}

export default ImpactIconOff;
