import { withPlaceholder } from "config/navigation/withPlaceholder";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useScrollEnabled } from "contexts/scrollEnabledContext";

import UserSupportBanner from "components/moleculars/UserSupportBanner";

import usePageView from "hooks/usePageView";
import PaymentPlaceholder from "components/moleculars/PaymentPlaceholder";

import { theme } from "@ribon.io/shared/styles";
import ArrowLeft from "components/vectors/ArrowLeft";
import { useNavigation } from "hooks/useNavigation";
import S from "./styles";
import CardScreen from "./CardScreen";

function SupportNonProfitScreen(): JSX.Element {
  const { scrollEnabled } = useScrollEnabled();
  const { popNavigation } = useNavigation();
  usePageView("P4_view");

  return (
    <ScrollView scrollEnabled={scrollEnabled}>
      <View style={S.arrow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => popNavigation()}
          testID="arrow-back-button"
        >
          <ArrowLeft color={theme.colors.brand.secondary[800]} />
        </TouchableOpacity>
      </View>
      <CardScreen />

      <View style={S.supportSection}>
        <UserSupportBanner from="giveNonProfit_page" />
      </View>
    </ScrollView>
  );
}

export default withPlaceholder(SupportNonProfitScreen, PaymentPlaceholder);
