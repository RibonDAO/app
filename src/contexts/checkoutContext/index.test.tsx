import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
import { useCheckoutContext } from ".";

function CheckoutTestPage() {
  useCheckoutContext();
  return (
    <View>
      <Text>checkout</Text>
    </View>
  );
}

describe("useCheckoutContext", () => {
  it("renders without error", async () => {
    await renderComponentAsync(<CheckoutTestPage />);
    expectTextToBeInTheDocument("checkout");
  });
});
