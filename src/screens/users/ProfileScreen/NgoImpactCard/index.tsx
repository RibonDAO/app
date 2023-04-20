import CardImageText from "components/moleculars/CardImageText";
import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import S from "./styles";

export type Props = {
  name: string;
  icon: string;
  description?: string | JSX.Element;
  label?: string;
};

function NgoImpactCard({ icon, name, description, label }: Props): JSX.Element {
  return (
    <View style={{ marginBottom: theme.spacingNative(12) }}>
      <CardImageText
        image={icon}
        subtitle={name}
        text={description}
        subtitleStyle={S.impact}
        textStyle={S.description}
        label={label}
      />
    </View>
  );
}

export default NgoImpactCard;
