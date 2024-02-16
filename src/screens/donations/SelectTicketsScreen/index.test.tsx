import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { causeFactory, nonProfitFactory } from "@ribon.io/shared/config";
import { waitForPromises } from "config/testUtils";
import SelectTicketsScreen from ".";

const mockCause = causeFactory();
const mockNonProfit = nonProfitFactory({ cause: mockCause });
jest.mock("hooks/useRouteParams", () => ({
  __esModule: true,
  useRouteParams: () => ({
    params: { nonProfit: mockNonProfit, cause: mockCause },
  }),
}));

describe("SelectTicketsScreen", () => {
  beforeEach(async () => {
    renderComponent(<SelectTicketsScreen />);
    await waitForPromises();
  });

  it("should render without error", async () => {
    expectTextToBeInTheDocument("Choose the size of your help");
    expectTextToBeInTheDocument("Continue");
  });
});
