import { useEffect } from "react";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import { ScrollView, View } from "react-native";
import { useScrollEnabled } from "contexts/scrollEnabledContext";
import { logEvent } from "services/analytics";
import UserSupportBanner from "components/moleculars/UserSupportBanner";
import CardScreen from "./CardScreen";
import Placeholder from "./placeholder";
import S from "./styles";

function SupportNonProfitScreen(): JSX.Element {
  const { scrollEnabled } = useScrollEnabled();

  useEffect(() => {
    logEvent("P4_view");
  }, []);

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <CardScreen />

      <View style={S.supportSection}>
        <UserSupportBanner from="" />
      </View>
    </ScrollView>
  );
}

export default withPlaceholder(SupportNonProfitScreen, Placeholder);
