import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import DirectDonationsImpactCards from "../DirectDonationsImpactCards";

function DirectDonationsTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="DirectDonationsTabView">
      <DirectDonationsImpactCards />
    </ParallaxTabViewContainer>
  );
}

export default DirectDonationsTabView;
