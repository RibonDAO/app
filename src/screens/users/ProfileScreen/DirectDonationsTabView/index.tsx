import { View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import NgoImpactCards from "../NgoImpactCards";

function DirectDonationsTabView(): JSX.Element {
  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.neutral10 }}>
      <NgoImpactCards />
    </View>
  );
}

export default DirectDonationsTabView;
