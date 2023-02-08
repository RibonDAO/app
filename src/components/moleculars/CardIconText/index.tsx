import Icon from "components/atomics/Icon";
import { View, Text } from "react-native";
import S from "./styles";

export type Props = {
  text: string;
  icon: string;
  rightComponent?: JSX.Element;
};

function CardIconText({ text, icon, rightComponent }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.insideContainer}>
        <Icon type="rounded" name={icon} size={24} />
        <Text style={S.text}>{text}</Text>
      </View>
      {rightComponent && (
        <View style={S.insideContainer}>{rightComponent}</View>
      )}
    </View>
  );
}

export default CardIconText;
