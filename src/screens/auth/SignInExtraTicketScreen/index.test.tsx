import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInScreen from ".";

jest.mock("services/googleSignIn", () => ({
  signIn: () => {},
}));

describe("SignInScreen", () => {
  beforeEach(() => {
    renderComponent(<SignInScreen />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("You won an extra ticket");
    expectTextToBeInTheDocument(
      "Validate your account created with  to get your extra ticket",
    );
  });

  it("logs the P28_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P28_view", {
      from: "validation_flow",
    });
  });
});
