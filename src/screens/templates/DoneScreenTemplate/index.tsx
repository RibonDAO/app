import React from "react";
import { Button, View, Text } from "react-native";
import Image from "components/atomics/Image";
import { theme } from "@ribon.io/shared/styles";
import Flare from "components/vectors/Flare";
import Sparkles from "components/vectors/Sparkles";
import ConfirmationNumber from "components/vectors/ConfirmationNumber";
import VolunteerActivism from "components/vectors/VolunteerActivism";
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
      <Flare color="#8CE0BE" />
      <Sparkles color="#8CE0BE" />
      <ConfirmationNumber color="#8CE0BE" />
      <VolunteerActivism color="#8CE0BE" />
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
