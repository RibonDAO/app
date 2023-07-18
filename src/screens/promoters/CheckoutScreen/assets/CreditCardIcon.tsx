import * as React from "react";
import Svg, { Rect, Mask, G, Path } from "react-native-svg";

function CreditCardIcon() {
  return (
    <Svg width={46} height={32} viewBox="0 0 46 32" fill="none">
      <Rect x={0.5} y={0.5} width={45} height={31} rx={3.5} fill="white" />
      <Mask
        id="mask0_588_17137"
        maskUnits="userSpaceOnUse"
        x={11}
        y={4}
        width={24}
        height={24}
      >
        <Rect x={11} y={4} width={24} height={24} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_588_17137)">
        <Path
          d="M33 10V22C33 22.55 32.8043 23.021 32.413 23.413C32.021 23.8043 31.55 24 31 24H15C14.45 24 13.9793 23.8043 13.588 23.413C13.196 23.021 13 22.55 13 22V10C13 9.45 13.196 8.97933 13.588 8.588C13.9793 8.196 14.45 8 15 8H31C31.55 8 32.021 8.196 32.413 8.588C32.8043 8.97933 33 9.45 33 10ZM15 12H31V10H15V12ZM15 16V22H31V16H15Z"
          fill="#44413B"
        />
      </G>
      <Rect x={0.5} y={0.5} width={45} height={31} rx={3.5} stroke="#44413B" />
    </Svg>
  );
}
export default CreditCardIcon;
