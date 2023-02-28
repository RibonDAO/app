import React from "react";
import { Button, View, Text, ImageBackground } from "react-native";
import Image from "components/atomics/Image";
import { theme } from "@ribon.io/shared/styles";
import GeneralIconsBackground from "assets/images/general-icons-background.png";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
  highlightedDescription?: string | JSX.Element;
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
      <ImageBackground
        source={GeneralIconsBackground}
        style={S.diamondBackground}
      >
        <View style={S.diamond}>
          {image && <Image style={S.cardImage} source={{ uri: image }} />}
        </View>
      </ImageBackground>
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
          color={theme.colors.brand.primary[300]}
        />
      )}
    </View>
  );
}
