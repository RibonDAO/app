import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Button, Text, View } from "react-native";
import { clickOn } from "config/testUtils";
import { useScrollEnabled } from ".";

function ScrollEnabledTestPage() {
  const { setScrollEnabled, scrollEnabled } = useScrollEnabled();
  return (
    <View>
      {scrollEnabled ? (
        <Text>Scroll Enabled</Text>
      ) : (
        <Text>Scroll Disabled</Text>
      )}
      <Button title="Enable Scroll" onPress={() => setScrollEnabled(true)} />
      <Button title="Disable Scroll" onPress={() => setScrollEnabled(false)} />
    </View>
  );
}

describe("useScrollEnabled", () => {
  it("starts enabled", () => {
    renderComponent(<ScrollEnabledTestPage />);
    expectTextToBeInTheDocument("Scroll Enabled");
  });

  it("sets the scroll to disabled when the function is called", () => {
    renderComponent(<ScrollEnabledTestPage />);
    clickOn("Disable Scroll");

    expectTextToBeInTheDocument("Scroll Disabled");
  });
});
