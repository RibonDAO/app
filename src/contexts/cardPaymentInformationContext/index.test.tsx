import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { Text, View } from "react-native";
import { waitForPromises } from "config/testUtils";
import { useCardPaymentInformation } from ".";

function CardPaymentInformationTestPage() {
  useCardPaymentInformation();
  return (
    <View>
      <Text>CardPaymentInformation</Text>
    </View>
  );
}

describe("useCardPaymentInformation", () => {
  it("renders without error", async () => {
    renderComponent(<CardPaymentInformationTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("CardPaymentInformation");
  });
});
