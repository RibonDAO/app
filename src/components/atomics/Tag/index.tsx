import React from "react";
import { View, Text } from "react-native";
import S from "./styles";

type Props = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
};

function Tag({ text, textColor, backgroundColor }: Props) {
  return (
    <View style={[S.container, { backgroundColor }]}>
      <Text style={(S.text, { color: textColor })}>{text}</Text>
    </View>
  );
}

export default Tag;
