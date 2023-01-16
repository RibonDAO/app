import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LetterIcon = () => (
  <Svg width={24} height={24} fill="none">
    <Path
      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
      fill="#00DA93"
    />
  </Svg>
);

export default LetterIcon;
