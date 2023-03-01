import { screen, fireEvent } from "@testing-library/react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import PaymentInformation from ".";

describe("CardInfoSection", () => {
  it("should fill payment methods form", async () => {
    renderComponent(<PaymentInformation />);
    await waitForPromises();

    fireEvent.changeText(
      screen.getByPlaceholderText("E-mail"),
      "usertest@ribon.io",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Card number"),
      "1234567890123456",
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Name on card"),
      "User Test",
    );
    fireEvent.changeText(screen.getByPlaceholderText("Expiration"), "1220");
    fireEvent.changeText(
      screen.getByPlaceholderText("Card verification code"),
      "123",
    );

    expectDisplayValueToBeInTheDocument("usertest@ribon.io");
    expectDisplayValueToBeInTheDocument("1234 5678 9012 3456");
    expectDisplayValueToBeInTheDocument("User Test");
    expectDisplayValueToBeInTheDocument("12/20");
    expectDisplayValueToBeInTheDocument("123");
  });
});
