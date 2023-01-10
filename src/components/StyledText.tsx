import { Text, TextProps } from "./Themed";

export function MonoText({ style }: TextProps) {
  return <Text style={[style, { fontFamily: "space-mono" }]} />;
}
