import Button from "components/atomics/buttons/Button";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import VerifiedBadge from "components/vectors/VerifiedBadge";
import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import S from "./styles";

export type Props = {
  image: string;
  buttonText: string;
  onClickButton: () => void;
  imageDescription?: string;
  infoTextLeft?: string;
  infoTextRight?: string;
  buttonDisabled?: boolean;
};

function CardCenterImageButton({
  image,
  buttonText,
  imageDescription,
  onClickButton,
  infoTextLeft,
  infoTextRight,
  buttonDisabled = false,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.cardWrapper}>
        <View style={S.containerImage}>
          <Image style={S.cardImage} source={{ uri: image }} />
          <Text style={S.imageDescription}>{imageDescription}</Text>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]}
            style={S.darkStroke}
          />
        </View>

        <View style={S.containerText}>
          <View style={S.infoContainer}>
            {infoTextLeft && (
              <>
                <Text style={S.info}>{infoTextLeft}</Text>
                <View style={S.icon}>
                  <VerifiedBadge />
                </View>
              </>
            )}
            {infoTextRight && (
              <>
                <Text style={S.bullet}>•</Text>
                <Text style={S.info}>{infoTextRight}</Text>
              </>
            )}
          </View>
          <Button
            onPress={onClickButton}
            text={buttonText}
            disabled={buttonDisabled}
          />
        </View>
      </View>
    </View>
  );
}

export default CardCenterImageButton;
