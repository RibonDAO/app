import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

function DefaultBackground() {
  return (
    <Svg
      width="296"
      height="432"
      viewBox="0 0 296 432"
      fill="none"
      testID="default-background"
    >
      <G clip-path="url(#clip0_1077_9743)">
        <Rect width="296" height="432" rx="16" fill="#E5FBED" />
        <Path
          d="M-47.0813 320.219L49.3242 290.93C49.5391 291.548 49.7582 292.185 49.9978 292.835C40.1961 312.688 36.7709 333.26 41.3615 352.686C55.4393 412.257 139.336 438.507 228.763 411.338C318.191 384.168 379.272 313.872 365.194 254.3C352.348 199.94 281.33 173.332 201.042 189.776L200.24 190.313L200.042 189.982C200.371 189.921 200.712 189.837 201.042 189.776L143.309 -54.5241C140.101 -68.1004 124.058 -70.5115 117.874 -58.3396L-62.7068 297.095C-68.8951 309.249 -59.0318 323.85 -47.0813 320.219Z"
          fill="#F6FEF9"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1077_9743">
          <Rect width="296" height="432" rx="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DefaultBackground;
