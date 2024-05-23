import * as React from "react";
import Svg, { Rect } from "react-native-svg";

function DefaultBackground() {
  return (
    <Svg width="296" height="432" viewBox="0 0 296 432" fill="none">
      <Rect width="296" height="432" rx="16" fill="#E5FBED" />
      <Rect x="16" y="16" width="264" height="400" rx="12" fill="white" />
    </Svg>
  );
}

export default DefaultBackground;
