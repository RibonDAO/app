import React from "react";
import { Button, View, Text } from "react-native";
import Image from "components/atomics/Image";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
  highlightedDescription?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
};
export default function DoneScreenTemplate({
  image,
  title,
  buttonTitle,
  description,
  highlightedDescription,
  onButtonPress,
}: Props) {
  return (
    <View style={S.container}>
      <View style={S.diamond}>
        {image && <Image style={S.cardImage} source={{ uri: image }} />}
      </View>
      {title && <Text style={S.title}>{title}</Text>}
      {description && (
        <Text style={S.description}>
          {description}
          {highlightedDescription && (
            <Text style={S.highlightedDescription}>
              {" "}
              {highlightedDescription}
            </Text>
          )}
        </Text>
      )}
      {buttonTitle && (
        <Button
          onPress={onButtonPress}
          title={buttonTitle}
          color={theme.colors.green30}
        />
      )}
    </View>
  );
}
