import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import ValidateAccountScreen from ".";

jest.mock("services/googleSignIn", () => ({
  signIn: () => {},
}));

describe("ValidateAccountScreen", () => {
  beforeEach(() => {
    renderComponent(<ValidateAccountScreen />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Validate your account and get a ticket");
    expectTextToBeInTheDocument(
      "Complete your login with  to receive your prize",
    );
  });

  it("logs the P28_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P28_view", {
      from: "validation_flow",
    });
  });
});
