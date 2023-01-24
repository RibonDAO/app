import { clickOn, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import SupportCausePage from ".";

const mockCause = { id: 1, name: "🌳 Environment", active: true, pools: [] };
const mockCause2 = { id: 2, name: "💊 Health", active: true, pools: [] };

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause, mockCause2],
    refetch: () => {},
  }),
}));

jest.mock("hooks/useNavigation", () => ({
  __esModule: true,
  useNavigation: () => jest.fn(),
}));

describe("SupportCausePage", () => {
  beforeEach(async () => {
    renderComponent(<SupportCausePage />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Donate with a community");
  });

  describe("community add section", () => {
    it("renders the community add section", () => {
      expectTextToBeInTheDocument("The Community will add");
    });
  });
});
