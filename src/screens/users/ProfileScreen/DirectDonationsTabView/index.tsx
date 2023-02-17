import { ScrollView } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import DirectDonationsImpactCards from "../DirectDonationsImpactCards";

function DirectDonationsTabView(): JSX.Element {
  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: theme.colors.neutral10 }}
      nestedScrollEnabled
    >
      <DirectDonationsImpactCards />
    </ScrollView>
  );
}

export default DirectDonationsTabView;
