import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponentAsync } from "config/testUtils/renders";
import PaymentPageV2 from ".";

describe("PaymentPageV2", () => {
  it("should render without error", () => {
    renderComponentAsync(<PaymentPageV2 />);

    expectTextToBeInTheDocument("Change currency");
  });
});
