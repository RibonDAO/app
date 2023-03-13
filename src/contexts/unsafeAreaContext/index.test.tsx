import { Button, Text, View } from "react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn, waitForPromises } from "config/testUtils";
import { useUnsafeAreaContext } from ".";

function UnsafeAreaTestPage() {
  const {
    topBackgroundColor,
    setTopBackgroundColor,
    bottomBackgroundColor,
    setBottomBackgroundColor,
  } = useUnsafeAreaContext();

  return (
    <View>
      <Text>Colors</Text>
      <Text>The top color is {topBackgroundColor}</Text>
      <Text>The bottom color is {bottomBackgroundColor}</Text>
      <Button
        title="Change top to red"
        onPress={() => setTopBackgroundColor("red")}
      />
      <Button
        title="Change bottom to blue"
        onPress={() => setBottomBackgroundColor("blue")}
      />
    </View>
  );
}

describe("UnsafeAreaTestPage", () => {
  it("renders without error", async () => {
    renderComponent(<UnsafeAreaTestPage />);
    await waitForPromises();

    expectTextToBeInTheDocument("Colors");
  });

  describe("topBackgroundColor", () => {
    it("starts with white", async () => {
      renderComponent(<UnsafeAreaTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("The top color is white");
    });
  });

  describe("bottomBackgroundColor", () => {
    it("starts with white", async () => {
      renderComponent(<UnsafeAreaTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("The bottom color is white");
    });
  });

  describe("setTopBackgroundColor", () => {
    it("changes the top background color", async () => {
      renderComponent(<UnsafeAreaTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("The top color is white");
      clickOn("Change top to red");
      expectTextToBeInTheDocument("The top color is red");
    });
  });

  describe("setBottomBackgroundColor", () => {
    it("changes the bottom background color", async () => {
      renderComponent(<UnsafeAreaTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("The bottom color is white");
      clickOn("Change bottom to blue");
      expectTextToBeInTheDocument("The bottom color is blue");
    });
  });
});
