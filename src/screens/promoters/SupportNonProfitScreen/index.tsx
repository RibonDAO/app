import { withPlaceholder } from "config/navigation/withPlaceholder";
import { ScrollView, View } from "react-native";
import { useScrollEnabled } from "contexts/scrollEnabledContext";

import UserSupportBanner from "components/moleculars/UserSupportBanner";

import usePageView from "hooks/usePageView";
import PaymentPlaceholder from "components/moleculars/PaymentPlaceholder";
import CardScreen from "./CardScreen";
import S from "./styles";

function SupportNonProfitScreen(): JSX.Element {
  const { scrollEnabled } = useScrollEnabled();
  usePageView("P4_view");

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <CardScreen />

      <View style={S.supportSection}>
        <UserSupportBanner from="giveNonProfit_page" />
      </View>
    </ScrollView>
  );
}

export default withPlaceholder(SupportNonProfitScreen, PaymentPlaceholder);
