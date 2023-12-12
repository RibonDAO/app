import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import AppleLogin from ".";

jest.mock("services/appleSignIn", () => ({
  signIn: () => {},
}));

const onContinue = jest.fn();
describe("AppleSection", () => {
  it("should render without error", () => {
    renderComponent(<AppleLogin onContinue={onContinue} />);

    expectTextToBeInTheDocument("Continue with Apple");
  });
});
