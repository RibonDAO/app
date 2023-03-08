import React from "react";
import { View, Text } from "react-native";
import CellPhone from "./assets/CellPhone";
import Image from "components/atomics/Image";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
};

export default function ImageWithInfoLayout({
  image,
  title,
  description,
}: Props): JSX.Element {
  const renderImage = () => {
    if (image) return <Image source={{ uri: image }} />;
  };

  return (
    <View style={S.container}>
      {image ? renderImage() : <CellPhone />}
      {title && <Text style={S.title}>{title}</Text>}
      {description && <Text style={S.description}>{description}</Text>}
    </View>
  );
}
