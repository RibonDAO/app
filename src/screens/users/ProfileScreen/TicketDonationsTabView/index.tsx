import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import NgoImpactCards from "../NgoImpactCards";

function TicketDonationsTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="TicketDonationsTabView">
      <NgoImpactCards />
    </ParallaxTabViewContainer>
  );
}

export default TicketDonationsTabView;
