import React from "react";
import { View, Text } from "react-native";
import CellPhone from "./assets/CellPhone";
import Image from "components/atomics/Image";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
  imageHeight?: number;
};

export default function ImageWithInfoLayout({
  image,
  title,
  description,
  imageHeight,
}: Props): JSX.Element {
  const renderImage = () => {
    if (image)
      return (
        <Image source={{ uri: image }} style={{ height: imageHeight || 256 }} />
      );
  };

  return (
    <View style={S.container}>
      {image ? renderImage() : <CellPhone height={imageHeight} />}
      {title && <Text style={S.title}>{title}</Text>}
      {description && <Text style={S.description}>{description}</Text>}
    </View>
  );
}
