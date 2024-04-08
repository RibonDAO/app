import Button from "components/atomics/buttons/Button";
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
  infoTextTop?: string;
  iconSubtitle: {
    icon: string;
    text: string;
    boldText?: string;
  };
  buttonDisabled?: boolean;
  labelText?: string;
};

function CardCenterImageButton({
  image,
  buttonText,
  imageDescription,
  onClickButton,
  onImagePress,
  infoTextTop,
  iconSubtitle,
  buttonDisabled = false,
  labelText,
}: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.cardWrapper}>
        <View style={S.containerImage}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onImagePress}
            activeOpacity={0.8}
          >
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
            <Image
              style={S.cardImage}
              source={{ uri: image }}
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          <Text style={S.imageDescription}>{imageDescription}</Text>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(40, 36, 28, 0.4)",
              "rgba(40, 36, 28, 0.8)",
            ]}
            style={S.darkStroke}
          />
        </View>

        <View style={S.containerText}>
          <View style={S.infoContainer}>
            {infoTextTop && (
              <View style={S.infoIcon}>
                <Text style={S.infoTop}>{infoTextTop}</Text>
                <View style={S.icon}>
                  <VerifiedBadge />
                </View>
              </View>
            )}
            <View style={S.iconSubtitleContainer}>
              <Icon
                type="rounded"
                name={iconSubtitle.icon}
                size={24}
                color={theme.colors.brand.primary[800]}
              />
              <View style={S.iconTextContainer}>
                <Text style={S.iconBoldText}>{iconSubtitle.boldText}</Text>
                <Text style={S.iconText}>{iconSubtitle.text}</Text>
              </View>
            </View>
          </View>
          <Button
            onPress={onClickButton}
            text={buttonText}
            disabled={buttonDisabled}
            customStyles={{
              ...S.button,
              ...(buttonDisabled ? S.disabledButton : {}),
            }}
            backgroundColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral10}
            borderColor={theme.colors.brand.primary[600]}
          />
        </View>
      </View>
    </View>
  );
}

export default CardCenterImageButton;
