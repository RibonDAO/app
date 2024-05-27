import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";

import CardReferral from "components/moleculars/CardReferral";
import { View } from "react-native";
import ImpactCards from "../ImpactCards";

function ImpactCardsTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="ImpactCardsTabView">
      <View style={{ padding: 16 }}>
        <CardReferral />
      </View>
      <ImpactCards />
    </ParallaxTabViewContainer>
  );
}

export default ImpactCardsTabView;
