import { theme } from "@ribon.io/shared";
import { Text, View } from "react-native";
import S from "./styles";

export type Props = {
  icon?: JSX.Element;
  title: string;
  subtitle: {
    icon?: JSX.Element;
    text: string;
    color: string;
  };
  borderColor?: string;
  backgroundColor?: string;
  children?: JSX.Element | JSX.Element[];
};

function CardTicket({
  icon,
  title,
  subtitle,
  borderColor = theme.colors.brand.primary[300],
  backgroundColor = theme.colors.neutral10,
  children,
}: Props): JSX.Element {
  return (
    <View style={[S.container, { backgroundColor, borderColor }]}>
      <View style={S.header}>
        {icon && <View>{icon}</View>}

        <View style={S.textContainer}>
          <Text style={S.title}>{title}</Text>
          <View style={S.subtitleContainer}>
            {subtitle.icon && (
              <View style={S.subtitleIcon}>{subtitle.icon}</View>
            )}
            <Text style={[S.subtitle, { color: subtitle.color }]}>
              {subtitle.text}
            </Text>
          </View>
        </View>
      </View>
      {children}
    </View>
  );
}

export default CardTicket;
