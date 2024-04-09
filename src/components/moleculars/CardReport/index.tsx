import { Text, TouchableOpacity, View } from "react-native";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared/styles";
import { openInWebViewer } from "lib/linkOpener";
import S from "./styles";

export type Props = {
  title: string;
  link: string;
  showIcon: boolean;
};

function CardReport({ title, link, showIcon }: Props): JSX.Element {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={() => openInWebViewer(link)}
      activeOpacity={0.5}
    >
      <View style={S.container}>
        {showIcon ? (
          <Icon
            type="rounded"
            name="lab_profile"
            size={24}
            color={theme.colors.brand.primary[600]}
          />
        ) : null}
        <Text style={S.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardReport;
