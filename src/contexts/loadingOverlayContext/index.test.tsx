import { clickOn } from "config/testUtils";
import { renderComponent } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { useLoadingOverlay } from ".";
import { Button, View } from "react-native";

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
  it("renders without error", () => {
    renderComponent(<LoadingOverlayTestPage />);
    expectTextToBeInTheDocument("hide");
    expectTextToBeInTheDocument("show");
  });

  describe("when show loading overlay is used", () => {
    it("shows the loading overlay with correct message", () => {
      renderComponent(<LoadingOverlayTestPage />);

      clickOn("show");
      expectTextToBeInTheDocument("test message");
    });
  });

  describe("when hide loading overlay is used", () => {
    it("hides the loading overlay", () => {
      renderComponent(<LoadingOverlayTestPage />);

      clickOn("show");
      expectTextToBeInTheDocument("test message");
      clickOn("hide");
      expectTextNotToBeInTheDocument("test message");
    });
  });
});
