import Button from "components/atomics/buttons/Button";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import VerifiedBadge from "components/vectors/VerifiedBadge";
import { Text, TouchableOpacity, View } from "react-native";
import Image from "components/atomics/Image";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export type Props = {
  image: string;
  buttonText: string;
  onClickButton: () => void;
  onImagePress?: () => void;
  imageDescription?: string | JSX.Element;
  infoTextLeft?: string;
  infoTextRight?: string;
  buttonDisabled?: boolean;
  labelText?: string;
};

function CardCenterImageButton({
  image,
  buttonText,
  imageDescription,
  onClickButton,
  onImagePress,
  infoTextLeft,
  infoTextRight,
  buttonDisabled = false,
  labelText,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.cardWrapper}>
        <View style={S.containerImage}>
          <TouchableOpacity onPress={onImagePress} activeOpacity={0.8}>
            {labelText && (
              <View style={S.labelContainer}>
                <Icon
                  type="rounded"
                  name="info"
                  size={16}
                  color={theme.colors.neutral10}
                />
                <Text style={S.label}>{labelText}</Text>
              </View>
            )}
            <Image style={S.cardImage} source={{ uri: image }} />
          </TouchableOpacity>
          <Text style={S.imageDescription}>{imageDescription}</Text>
          <LinearGradient
            colors={["transparent", "rgba(40, 36, 28, 0.4)", "rgba(40, 36, 28, 0.8)"]}
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
            customStyles={S.button}
          />
        </View>
      </View>
    </View>
  );
}

export default CardCenterImageButton;
