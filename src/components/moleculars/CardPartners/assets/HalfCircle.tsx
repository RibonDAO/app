import * as React from "react";
import Svg, { Circle } from "react-native-svg";

function HalfCircle(props: any) {
  return (
    <Svg
      width={200}
      height={80}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={100} cy={-20} r={100} fill="#C5F7D5" />
    </Svg>
  );
}

export default HalfCircle;
