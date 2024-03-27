import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInExtraTicketScreen from ".";

jest.mock("services/googleSignIn", () => ({
  signIn: () => {},
}));

describe("SignInExtraTicketScreen", () => {
  beforeEach(() => {
    renderComponent(<SignInExtraTicketScreen />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Validate your account and get a ticket");
    expectTextToBeInTheDocument(
      "Complete your login with  to receive your prize",
    );
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      from: "validation_flow",
    });
  });
});
