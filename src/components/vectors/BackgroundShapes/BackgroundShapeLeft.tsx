import { theme } from "@ribon.io/shared/styles";
import * as React from "react";
import { Path, Svg } from "react-native-svg";

type Props = {
  color?: string;
};

function BackgroundShapeLeft({
  color = theme.colors.brand.primary[900],
}: Props) {
  return (
    <Svg width="123" height="182" viewBox="0 0 123 182" fill="none">
      <Path
        d="M59.1423 -47.8286L-20.7743 -2.85335C-26.796 0.535562 -28.9245 8.16827 -25.5298 14.2003L-5.82173 49.2195L-57.2464 78.1602C-63.2682 81.5491 -65.3966 89.1818 -62.0019 95.2138L-16.95 175.267C-13.5553 181.299 -5.92628 183.44 0.0954831 180.051L80.012 135.076C86.0338 131.687 88.1622 124.054 84.7675 118.022L65.0595 83.003L116.484 54.0623C122.506 50.6734 124.634 43.0407 121.24 37.0087L76.1878 -43.0441C72.7931 -49.0761 65.164 -51.2175 59.1423 -47.8286Z"
        fill={color}
      />
    </Svg>
  );
}

export default BackgroundShapeLeft;
