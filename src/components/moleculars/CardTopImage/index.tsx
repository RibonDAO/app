import React from "react";
import S from "./styles";
import { Text, View } from "react-native";
import { Image } from "react-native";

export type Props = {
  imageUrl?: string;
  text?: string;
};
function CardTopImage({ imageUrl, text }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <Image style={S.image} source={{ uri: imageUrl }} />
      <Text style={S.text}>{text}</Text>
    </View>
  );
}

export default CardTopImage;
