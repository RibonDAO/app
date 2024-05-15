import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import NotificationPaymentFailed from ".";

jest.mock("lib/localStorage", () => ({
  getLocalStorageItem: jest.fn(),
  removeLocalStorageItem: jest.fn(),
  setLocalStorageItem: jest.fn(),
}));

describe("NotificationPaymentFailed", () => {
  beforeEach(async () => {
    renderComponent(<NotificationPaymentFailed />, {
      paymentFailedNotificationProviderValue: {
        visible: true,
      },
    });
    await waitForPromises();
  });

  it("should render without error", async () => {
    expectTextToBeInTheDocument("The Ribon Club payment failed");
  });
});
