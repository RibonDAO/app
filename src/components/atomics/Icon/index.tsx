import { createIconSet } from "@expo/vector-icons";
import MaterialIconsRoundedGlyphMap from "assets/fonts/MaterialSymbolsRounded.json";
import MaterialIconsOutlineGlyphMap from "assets/fonts/MaterialSymbolsOutline.json";
import MaterialIconsSharpGlyphMap from "assets/fonts/MaterialSymbolsSharp.json";

const IconRounded = createIconSet(
  MaterialIconsRoundedGlyphMap,
  "MaterialSymbolsRounded",
  "material-symbols-rounded.ttf",
);

const IconOutline = createIconSet(
  MaterialIconsOutlineGlyphMap,
  "MaterialSymbolsOutline",
  "material-symbols-outline.ttf",
);

const IconSharp = createIconSet(
  MaterialIconsSharpGlyphMap,
  "MaterialSymbolsSharp",
  "material-symbols-sharp.ttf",
);

export { IconRounded, IconOutline, IconSharp };
export default IconRounded;
