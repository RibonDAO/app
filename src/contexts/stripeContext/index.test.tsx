import { renderComponent } from "config/testUtils/renders";
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
  it("renders without error", () => {
    renderComponent(<StripeTestPage />);
    expectTextToBeInTheDocument("Stripe");
  });
});
