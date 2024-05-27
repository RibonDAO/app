import { Text, View } from "react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import Button from "components/atomics/buttons/Button";
import { usePaymentFailedNotification } from ".";

jest.mock("lib/localStorage", () => ({
  getLocalStorageItem: jest.fn(),
  removeLocalStorageItem: jest.fn(),
  setLocalStorageItem: jest.fn(),
}));

function PaymentFailedNotification() {
  const { visible, setVisible } = usePaymentFailedNotification();

  const closeNotification = () => {
    setVisible(false);
  };

  return (
    <View>
      <Text>Payment Failed Notification</Text>
      <Text>{visible}</Text>
      <Button onPress={closeNotification} text="Close Notification" />
    </View>
  );
}

describe("useTickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders without error", async () => {
    renderComponent(<PaymentFailedNotification />);
    await waitForPromises();
    expectTextToBeInTheDocument("Payment Failed Notification");
  });
});
