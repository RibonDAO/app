import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardPartners from ".";

describe("CardLargeImage", () => {
  it("renders without error", () => {
    renderComponent(<CardPartners />);

    expectTextToBeInTheDocument("Ribon partners");
  });
});
