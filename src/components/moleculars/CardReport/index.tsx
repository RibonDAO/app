import { Text, View } from "react-native";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export type Props = {
  title: string;
};

function CardReport({ title }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <Icon
        type="rounded"
        name="lab_profile"
        size={24}
        color={theme.colors.brand.primary[600]}
      />
      <Text style={S.title}>{title} →</Text>
    </View>
  );
}

export default CardReport;
