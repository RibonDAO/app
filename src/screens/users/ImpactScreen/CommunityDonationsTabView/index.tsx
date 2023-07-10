import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import CommunityDonationsImpactCards from "../CommunityDonationsImpactCards";

function CommunityDonationsTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="CommunityDonationsTabView">
      <CommunityDonationsImpactCards />
    </ParallaxTabViewContainer>
  );
}

export default CommunityDonationsTabView;
