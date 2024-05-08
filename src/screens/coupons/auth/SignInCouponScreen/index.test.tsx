import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInCouponScreen from ".";

jest.mock("services/googleSignIn", () => ({
  signIn: () => {},
}));

describe("SignInCouponScreen", () => {
  beforeEach(() => {
    renderComponent(<SignInCouponScreen />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Sign in to your account");
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      from: "coupon_flow",
    });
  });
});
