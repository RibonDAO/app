import { ScrollView } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import CommunityDonationsImpactCards from "../CommunityDonationsImpactCards";

function CommunityDonationsTabView(): JSX.Element {
  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: theme.colors.neutral10 }}
    >
      <CommunityDonationsImpactCards />
    </ScrollView>
  );
}

export default CommunityDonationsTabView;
