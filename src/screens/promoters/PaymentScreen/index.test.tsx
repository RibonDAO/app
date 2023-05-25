import { clickOn, fillByPlaceholder, waitForPromises } from "config/testUtils";
import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { offerFactory, causeFactory } from "@ribon.io/shared/config";
import { screen } from "@testing-library/react-native";
import PaymentPage from ".";

const mockOffer = offerFactory();
const mockCause = causeFactory();
jest.mock("hooks/useRouteParams", () => ({
  __esModule: true,
  useRouteParams: () => ({
    params: { offer: mockOffer, cause: mockCause, flow: "cause" },
  }),
}));

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCardGivingFees: () => ({
    cardGivingFees: {
      netGiving: 10,
      serviceFees: 10,
    },
  }),
}));
describe("PaymentPage", () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(async () => {
    await renderComponentAsync(<PaymentPage />, {
      cardPaymentProviderValue: {
        country: "Brazil",
        state: "DF",
        handleSubmit: mockHandleSubmit,
      },
    });
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument(mockOffer.price);
    expectTextToBeInTheDocument(mockCause.name);
  });

  describe("when the page is in user section", () => {
    describe("continue button", () => {
      describe("when the form is not filled", () => {
        it("stays on disabled state", () => {
          expect(
            screen.getByTestId("button-Continue").props.accessibilityState
              .disabled,
          );
        });
      });

      describe("when the form is filled", () => {
        beforeEach(() => {
          fillByPlaceholder("City", "Brasilia");
          fillByPlaceholder("Tax ID", "00000000000");
        });

        it("goes to enabled mode", () => {
          expect(
            screen.getByTestId("button-Continue").props.accessibilityState
              ?.disabled,
          ).toBeFalsy();
        });

        it("goes to card section when clicked", () => {
          clickOn("Continue");

          expect(screen.getByPlaceholderText("Card number")).toBeDefined();
        });
      });
    });
  });

  describe("when the page is in card section", () => {
    beforeEach(() => {
      fillByPlaceholder("City", "Brasilia");
      fillByPlaceholder("Tax ID", "00000000000");

      clickOn("Continue");
    });

    describe("continue button", () => {
      describe("when the form is not filled", () => {
        it("stays on disabled state", () => {
          expect(
            screen.getByTestId("button-Continue").props.accessibilityState
              ?.disabled,
          ).toBeTruthy();
        });
      });

      describe("when the form is filled", () => {
        beforeEach(() => {
          fillByPlaceholder("Card number", "4111111111111111");
          fillByPlaceholder("Expiration", "0525");
          fillByPlaceholder("Name on card", "JOHN DOE");
          fillByPlaceholder("E-mail", "john@doe.com");
          fillByPlaceholder("Card verification code", "411");
        });

        it("calls the handle submit function when clicked", () => {
          clickOn("Continue");

          expect(mockHandleSubmit).toHaveBeenCalled();
        });
      });
    });
  });
});
