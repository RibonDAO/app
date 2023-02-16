import { View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import DirectDonationsImpactCards from "../DirectDonationsImpactCards";

function DirectDonationsTabView(): JSX.Element {
  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.neutral10 }}>
      <DirectDonationsImpactCards />
    </View>
  );
}

export default DirectDonationsTabView;
