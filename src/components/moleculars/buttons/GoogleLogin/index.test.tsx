import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import GoogleSection from ".";

jest.mock("services/googleSignIn", () => ({
  signIn: () => {},
}));

const onContinue = jest.fn();
describe("GoogleSection", () => {
  it("should render without error", () => {
    renderComponent(<GoogleSection onContinue={onContinue} />);

    expectTextToBeInTheDocument("Continue with Google");
  });
});
