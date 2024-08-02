import { renderComponent } from "config/testUtils/renders";
import { expectLogEventToHaveBeenCalledWith } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import { screen } from "@testing-library/react-native";
import ValidateAccountScreen from ".";

describe("ValidateAccountScreen", () => {
  beforeEach(() => {
    renderComponent(<ValidateAccountScreen />);
  });

  it("should render without error", () => {
    expect(screen.getByTestId("loader")).toBeTruthy();
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      from: "validation_flow",
    });
  });
});
