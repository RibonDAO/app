import UserSupportSection from "components/moleculars/UserSupportSection";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import { ScrollView, View } from "react-native";
import CardScreen from "./CardScreen";
import Placeholder from "./placeholder";
import S from "./styles";

function SupportNonProfitScreen(): JSX.Element {
  return (
    <ScrollView>
      <CardScreen />

      <View style={S.supportSection}>
        <UserSupportSection />
      </View>
    </ScrollView>
  );
}

export default withPlaceholder(SupportNonProfitScreen, Placeholder);
