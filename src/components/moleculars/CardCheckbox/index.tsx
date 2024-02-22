import { theme } from "@ribon.io/shared";
import Icon from "components/atomics/Icon";
import { useState } from "react";
import * as S from "./styles";

type CardCheckboxProps = {
  value: string;
  recurrence: string;
  firstDescription: string;
  firstIconName: string;
  secondDescription: string;
  secondIconName: string;
  checked?: boolean;
  tagText?: string;
  onClick?: () => void;
};

function CardCheckbox({
  value,
  recurrence,
  firstDescription,
  firstIconName,
  secondDescription,
  secondIconName,
  checked = false,
  tagText,
  onClick,
}: CardCheckboxProps): JSX.Element {
  const [selected, setSelected] = useState(checked);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setSelected(!selected);
    }
  };

  return (
    <S.Container
      checked={onClick !== undefined ? checked : selected}
      onPress={handleClick}
      testID="card-checkbox"
    >
      {tagText && (
        <S.Tag>
          <S.TagText>{tagText}</S.TagText>
        </S.Tag>
      )}
      <S.MainContent>
        <S.SelectValue>
          <S.Text>
            <S.Value>{value}</S.Value> /{" "}
            <S.Recurrence>{recurrence}</S.Recurrence>
          </S.Text>
          <S.Checkbox
            checked={onClick !== undefined ? checked : selected}
            onPress={handleClick}
          />
        </S.SelectValue>
        <S.IconWithText>
          <Icon
            type="outlined"
            name={firstIconName}
            color={theme.colors.neutral[700]}
            size={24}
          />
          <S.DescriptionText>{firstDescription}</S.DescriptionText>
        </S.IconWithText>
        <S.IconWithText>
          <Icon
            type="outlined"
            name={secondIconName}
            color={theme.colors.neutral[700]}
            size={24}
          />
          <S.DescriptionText>{secondDescription}</S.DescriptionText>
        </S.IconWithText>
      </S.MainContent>
    </S.Container>
  );
}

export default CardCheckbox;
