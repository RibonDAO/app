import UserSupportSection from "components/moleculars/UserSupportSection";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import { ScrollView, View } from "react-native";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import CardScreen from "./CardScreen";
import Placeholder from "./placeholder";
import S from "./styles";

function SupportNonProfitScreen(): JSX.Element {
  const { scrollEnabled } = useScrollEnabled();

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <CardScreen />

      <View style={S.supportSection}>
        <UserSupportSection />
      </View>
    </ScrollView>
  );
}

export default withPlaceholder(SupportNonProfitScreen, Placeholder);
