import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import S from "./styles";

export default function Header() {
  const { popNavigation } = useNavigation();
  return (
    <View style={S.header}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={popNavigation}
        style={S.backButton}
      >
        <Icon
          type="outlined"
          name="arrow_back"
          size={20}
          color={theme.colors.brand.primary[900]}
        />
      </TouchableOpacity>
    </View>
  );
}
