import { screen, fireEvent } from "@testing-library/react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectDisplayValueToBeInTheDocument } from "config/testUtils/expects";
import UserInfoSection from ".";

describe("UserInfoSection", () => {
  it("should fill billing information form", () => {
    renderComponent(<UserInfoSection />, {
      cardPaymentProviderValue: {
        country: "Brazil",
      },
    });

    fireEvent.changeText(screen.getByPlaceholderText("City"), "São Paulo");
    fireEvent.changeText(screen.getByPlaceholderText("Tax ID"), "00000000000");

    expectDisplayValueToBeInTheDocument("São Paulo");
    expectDisplayValueToBeInTheDocument("000.000.000-00");
  });
});
