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
    expectTextToBeInTheDocument("Sign in to your account");
  });

  it("logs the P28_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P28_view", {
      from: "validation_flow",
    });
  });
});
