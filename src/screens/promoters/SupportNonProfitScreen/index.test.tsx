import { clickOn, waitForPromises } from "config/testUtils";
import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { causeFactory, nonProfitFactory } from "@ribon.io/shared/config";
import SupportNonProfitScreen from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ name: "💊 Health", id: 2, active: true });
const mockNonProfit = nonProfitFactory({ cause: mockCause });
const mockNonProfit2 = nonProfitFactory({
  cause: mockCause2,
  name: "Other non Profit",
});

describe("SupportNonProfitScreen", () => {
  beforeEach(async () => {
    renderComponent(<SupportNonProfitScreen />, {
      causesProviderValue: {
        causes: [mockCause, mockCause2],
        refetch: () => {},
      },
      nonProfitsProviderValue: {
        nonProfits: [mockNonProfit, mockNonProfit2],
        refetch: () => {},
      },
    });
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Make a direct donation");
  });

  it("logs the nonProfitSupportScreen_view event", () => {
    expectLogEventToHaveBeenCalledWith("P4_view");
  });

  it("shows only the non profits for that cause", () => {
    expectTextToBeInTheDocument(mockNonProfit.name);
    expectTextNotToBeInTheDocument(mockNonProfit2.name);
  });

  describe("when the button option is clicked", () => {
    it("shows the non profits for that cause", () => {
      clickOn(mockCause.name);

      expectTextToBeInTheDocument(mockNonProfit.name);
    });
  });
});
