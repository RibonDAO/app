import { theme } from "@ribon.io/shared/styles";
import CheckBox from "components/atomics/inputs/Checkbox";
import Button from "components/atomics/buttons/Button";
import * as S from "./styles";

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
    <S.Container>
      <S.AnimationContainer>
        <S.Diamond>
          {image && (
            <S.CardImage
              source={{ uri: image }}
              accessibilityIgnoresInvertColors={false}
              accessibilityHint=""
              accessibilityLabel={imageDescription || ""}
            />
          )}
        </S.Diamond>
      </S.AnimationContainer>
      {title && <S.Title>{title}</S.Title>}
      {description && (
        <S.Description>
          {description}
          {highlightedDescription && (
            <S.HighlightedDescription>
              {" "}
              {highlightedDescription}
            </S.HighlightedDescription>
          )}
        </S.Description>
      )}
      {hasCheckbox && (
        <S.CheckboxContainer>
          <CheckBox
            text={checkboxText || ""}
            checked={checked}
            onChecked={onChecked}
            checkedColor={theme.colors.brand.primary[800]}
            unCheckedColor={theme.colors.neutral[600]}
          />
        </S.CheckboxContainer>
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
            borderRadius: 12,
          }}
        />
      )}
    </S.Container>
  );
}
