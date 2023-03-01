import { clickOn, waitForPromises } from "config/testUtils";
import { renderComponent } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { Button, View } from "react-native";
import { useLoadingOverlay } from ".";

function LoadingOverlayTestPage() {
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  return (
    <View>
      <Button onPress={() => hideLoadingOverlay()} title="hide" />
      <Button onPress={() => showLoadingOverlay("test message")} title="show" />
    </View>
  );
}

describe("useLoadingOverlay", () => {
  beforeEach(async () => {
    renderComponent(<LoadingOverlayTestPage />);
    await waitForPromises();
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("hide");
    expectTextToBeInTheDocument("show");
  });

  describe("when show loading overlay is used", () => {
    it("shows the loading overlay with correct message", () => {
      clickOn("show");

      expectTextToBeInTheDocument("test message");
    });
  });

  describe("when hide loading overlay is used", () => {
    it("hides the loading overlay", () => {
      clickOn("show");
      expectTextToBeInTheDocument("test message");
      clickOn("hide");

      expectTextNotToBeInTheDocument("test message");
    });
  });
});
