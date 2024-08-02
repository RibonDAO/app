import Icon from "components/atomics/Icon";
import * as S from "./styles";

type IconProps = {
  name: string;
  type: "rounded" | "sharp" | "outlined";
  color?: string;
  size?: number;
};

type Props = {
  icon: IconProps;
  text: string;
  linkIcon?: () => JSX.Element;
  cta?: JSX.Element;
  onPress?: () => void;
  last?: boolean;
  hitSlop?: number;
};

function ConfigItem({
  icon,
  text,
  cta,
  linkIcon,
  onPress,
  last,
  hitSlop,
}: Props): JSX.Element {
  return (
    <S.ConfigItem onPress={onPress} hitSlop={hitSlop} last={last}>
      <S.IconContainer>
        <Icon
          name={icon.name}
          type={icon.type}
          color={icon.color}
          size={icon.size}
        />
      </S.IconContainer>
      <S.TextContainer>
        <S.Text>{text}</S.Text>
      </S.TextContainer>
      <S.CtaContainer>
        {cta && cta}
        {linkIcon && linkIcon()}
      </S.CtaContainer>
    </S.ConfigItem>
  );
}

export default ConfigItem;
