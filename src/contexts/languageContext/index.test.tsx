import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
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
    await renderComponentAsync(<LanguageTestPage />);
    expectTextToBeInTheDocument("Language");
  });
});
