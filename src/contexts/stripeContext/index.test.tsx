import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
import { useStripeContext } from ".";

function StripeTestPage() {
  useStripeContext();
  return (
    <View>
      <Text>Stripe</Text>
    </View>
  );
}

describe("useStripeContext", () => {
  it("renders without error", async () => {
    await renderComponentAsync(<StripeTestPage />);
    expectTextToBeInTheDocument("Stripe");
  });
});
