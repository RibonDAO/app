import { theme } from "@ribon.io/shared/styles";
import { Path, Svg } from "react-native-svg";

type Props = {
  color?: string;
};

function BackgroundShapeRight({
  color = theme.colors.brand.primary[900],
}: Props) {
  return (
    <Svg width="130" height="157" viewBox="0 0 130 157" fill="none">
      <Path
        d="M67.9637 121.867L4.70855 138.811C-0.723335 140.267 -1.68097 147.554 3.18747 150.365L98.7199 205.521C104.516 208.867 111.927 206.882 115.273 201.087L170.421 105.567C170.497 105.436 170.545 105.308 170.61 105.18C170.969 104.603 171.315 104.019 171.659 103.424C190.664 70.5061 179.378 28.4196 146.456 9.41188C113.534 -9.59587 71.4455 1.68403 52.4442 34.5954C35.4421 64.0438 42.6845 100.834 67.9637 121.867Z"
        fill={color}
      />
    </Svg>
  );
}

export default BackgroundShapeRight;
