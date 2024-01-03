import { View, Text } from "react-native";
import Image from "components/atomics/Image";
import { theme } from "@ribon.io/shared/styles";
import CheckBox from "components/atomics/inputs/Checkbox";
import Button from "components/atomics/buttons/Button";
import S from "./styles";

type Props = {
  image?: string;
  title?: string;
  description?: string;
  highlightedDescription?: string | JSX.Element;
  buttonTitle?: string;
  onButtonPress?: () => void;
  imageDescription?: string;
  checkboxText?: string;
  checked?: boolean;
  onChecked?: () => void;
};
export default function DoneScreenTemplate({
  image,
  title,
  buttonTitle,
  description,
  highlightedDescription,
  onButtonPress,
  imageDescription,
  checkboxText,
  checked,
  onChecked,
}: Props) {
  const hasCheckbox = checked !== undefined;

  return (
    <View style={S.container}>
      <View style={S.animationContainer}>
        <View style={S.diamond}>
          {image && (
            <Image
              style={S.cardImage}
              source={{ uri: image }}
              accessibilityIgnoresInvertColors={false}
              accessibilityHint=""
              accessibilityLabel={imageDescription || ""}
            />
          )}
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
      {hasCheckbox && (
        <View style={S.checkboxContainer}>
          <CheckBox
            text={checkboxText || ""}
            checked={checked}
            onChecked={onChecked}
            checkedColor={theme.colors.brand.primary[800]}
            unCheckedColor={theme.colors.neutral[600]}
          />
        </View>
      )}
      {buttonTitle && onButtonPress && (
        <Button
          onPress={() => onButtonPress()}
          text={buttonTitle}
          customTextStyles={{
            color: theme.colors.neutral10,
          }}
          customStyles={{
            backgroundColor: theme.colors.brand.primary[600],
            borderColor: theme.colors.brand.primary[800],
          }}
        />
      )}
    </View>
  );
}
