import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardReferral from ".";

describe("CardLargeImage", () => {
  it("renders without error", () => {
    renderComponent(<CardReferral />);

    expectTextToBeInTheDocument("Invite your friends");
  });
});
