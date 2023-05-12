import React from "react";
import { Button, View, Text } from "react-native";
import Image from "components/atomics/Image";
import { theme } from "@ribon.io/shared/styles";
import LottieAnimation from "components/atomics/LottieAnimation";
import BackgroundAnimation from "assets/animations/green-hearts.json";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
  highlightedDescription?: string | JSX.Element;
  buttonTitle?: string;
  onButtonPress?: () => void;
  children?: JSX.Element | JSX.Element[];
};
export default function DoneScreenTemplate({
  image,
  title,
  buttonTitle,
  description,
  highlightedDescription,
  onButtonPress,
  children,
}: Props) {
  return (
    <View style={S.container}>
      <View style={S.animationContainer}>
        <View style={S.diamondBackground}>
          <LottieAnimation
            animationData={BackgroundAnimation}
            width={320}
            height={320}
            style={{ borderRadius: 500, opacity: 0.7 }}
          />
        </View>
        <View style={S.diamond}>
          {image && <Image style={S.cardImage} source={{ uri: image }} />}
        </View>
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
      {children}
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
