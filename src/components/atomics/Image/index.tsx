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
  transition?: number;
}
function Image({ source, style, transition = 800, ...rest }: Props) {
  if (typeof source === "number") {
    return (
      <ReactNativeImageComponent source={source} style={style} {...rest} />
    );
  }

  return (
    <ExpoImage
      style={style}
      source={{ uri: source.uri }}
      placeholder={blurhash}
      contentFit="cover"
      transition={transition}
      {...(rest as any)}
    />
  );
}
export default Image;
