import { View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import CommunityDonationsImpactCards from "../CommunityDonationsImpactCards";

function CommunityDonationsTabView(): JSX.Element {
  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.neutral10 }}>
      <CommunityDonationsImpactCards />
    </View>
  );
}

export default CommunityDonationsTabView;
