import { waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import ExpiredLinkScreen from ".";

describe("ExpiredLinkScreen", () => {
  beforeEach(() => {
    renderComponent(<ExpiredLinkScreen />);
  });
  it("should render without error", () => {
    expectTextToBeInTheDocument("This link has expired");
    expectTextToBeInTheDocument(
      "Please, try signing in or creating a new account with your e-mail to get a new account validation link",
    );
    expectTextToBeInTheDocument("Send me a new link");
  });

  it("should logs an event when renders", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P30_view");
  });
});
