import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import { Text, View } from "react-native";
import S from "./styles";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onButtonPress: () => void;
  image?: JSX.Element;
};
function ZeroDonationsSection({
  title,
  description,
  buttonText,
  onButtonPress,
  image,
}: Props): JSX.Element {
  return (
    <View style={S.zeroDonationsSection}>
      {image}
      <Text style={S.zeroDonationsTitle}>{title}</Text>
      <Text style={S.zeroDonationsDescription}>{description}</Text>
      <Button
        text={buttonText}
        onPress={onButtonPress}
        textColor={theme.colors.brand.primary[400]}
        customStyles={{ width: 200 }}
      />
    </View>
  );
}

export default ZeroDonationsSection;
