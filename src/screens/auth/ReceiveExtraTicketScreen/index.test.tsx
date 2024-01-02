import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import ReceiveExtraTicketPage from ".";

describe("ReceiveExtraTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<ReceiveExtraTicketPage />);

    expectTextToBeInTheDocument("Validating your account brought you here");
    expectTextToBeInTheDocument("Get my ticket");
  });
});
