import React from "react";
import {
  Image as ReactNativeImageComponent,
  ImageStyle,
  ImageRequireSource,
  ImageProps,
} from "react-native";
import { Image as ExpoImage } from "expo-image";

const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

interface Props extends ImageProps {
  source: { uri: string } | ImageRequireSource;
  style?: ImageStyle;
}
function Image({ source, style, ...rest }: Props) {
  if (typeof source === "number") {
    return <ReactNativeImageComponent source={source} style={style} />;
  }

  return (
    <ExpoImage
      style={style}
      source={{ uri: source.uri }}
      placeholder={blurhash}
      contentFit="cover"
      transition={1000}
    />
  );
}
export default Image;
