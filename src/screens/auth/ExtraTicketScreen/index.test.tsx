import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import ExtraTicketScreen from ".";

describe("ExtraTicketScreen", () => {
  it("should render without error", () => {
    renderComponent(<ExtraTicketScreen />);

    expectTextToBeInTheDocument("You won an extra ticket");
    expectTextToBeInTheDocument("Continue without extra ticket");
  });
});
