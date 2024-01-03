import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";

import ImpactCards from "../ImpactCards";

function ImpactCardsTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="ImpactCardsTabView">
      <ImpactCards />
    </ParallaxTabViewContainer>
  );
}

export default ImpactCardsTabView;
