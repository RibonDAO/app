import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { View, Text } from "react-native";
import { useAuthentication } from ".";

function AuthenticationTestPage() {
  useAuthentication();
  return (
    <View>
      <Text>Authentication</Text>
    </View>
  );
}

describe("useAuthentication", () => {
  it("renders without error", async () => {
    await renderComponentAsync(<AuthenticationTestPage />);
    expectTextToBeInTheDocument("Authentication");
  });
});
