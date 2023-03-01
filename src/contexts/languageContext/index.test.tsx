import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
import { waitForPromises } from "config/testUtils";
import { useLanguage } from ".";

function LanguageTestPage() {
  useLanguage();
  return (
    <View>
      <Text>Language</Text>
    </View>
  );
}

describe("useLanguage", () => {
  it("renders without error", async () => {
    renderComponent(<LanguageTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Language");
  });
});
