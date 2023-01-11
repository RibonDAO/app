import { View, Text } from "components/Themed";
import S from "./styles";

export type Props = {
  text: string;
  icon: JSX.Element;
  rightComponent?: JSX.Element;
};

function CardIconText({ text, icon, rightComponent }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.insideContainer}>
        {/* <S.Icon alt="left-icon" src={icon} /> */}
        <Text style={S.text}>{text}</Text>
      </View>
      {rightComponent && (
        <View style={S.insideContainer}>{rightComponent}</View>
      )}
    </View>
  );
}

export default CardIconText;
