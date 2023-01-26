import { createIconSet } from "@expo/vector-icons";
import MaterialIconsRoundedGlyphMap from "assets/fonts/MaterialSymbolsRounded.json";
import MaterialIconsOutlineGlyphMap from "assets/fonts/MaterialSymbolsOutline.json";
import MaterialIconsSharpGlyphMap from "assets/fonts/MaterialSymbolsSharp.json";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

const IconRounded = createIconSet(
  MaterialIconsRoundedGlyphMap,
  "MaterialSymbolsRounded",
  "material-symbols-rounded.ttf",
);

const IconOutline = createIconSet(
  MaterialIconsOutlineGlyphMap,
  "MaterialSymbolsOutlined",
  "material-symbols-outlined.ttf",
);

const IconSharp = createIconSet(
  MaterialIconsSharpGlyphMap,
  "MaterialSymbolsSharp",
  "material-symbols-sharp.ttf",
);

interface Props
  extends IconProps<any> {
  type: "sharp" | "rounded" | "outlined";
}
function Icon(props: Props) {
  const { type, ...rest } = props;
  switch (type) {
    case "sharp":
      return <IconSharp {...rest} />;
    case "rounded":
      return <IconRounded {...rest} />;
    case "outlined":
      return <IconOutline {...rest} />;
    default:
      return <IconRounded {...rest} />;
  }
}

export { IconRounded, IconOutline, IconSharp };
export default Icon;
