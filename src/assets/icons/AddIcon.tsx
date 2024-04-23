import * as React from "react";
import { Path, Svg } from "react-native-svg";

type Props = {
  width: number;
  height: number;
};

export default function AddIcon({ width, height }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 13 12" fill="none">
      <Path
        d="M5.34023 12V0H8.37413V12H5.34023ZM0.857178 7.51695V4.48305H12.8572V7.51695H0.857178Z"
        fill="#6DDFA6"
      />
    </Svg>
  );
}
