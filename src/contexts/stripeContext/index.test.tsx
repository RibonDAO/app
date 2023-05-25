import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
import { useStripe } from ".";

function StripeTestPage() {
  useStripe();
  return (
    <View>
      <Text>Stripe</Text>
    </View>
  );
}

describe("useStripe", () => {
  it("renders without error", async () => {
    await renderComponentAsync(<StripeTestPage />);
    expectTextToBeInTheDocument("Stripe");
  });
});
