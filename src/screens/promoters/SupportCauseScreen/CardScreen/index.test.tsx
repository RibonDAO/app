import { waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { causeFactory } from "@ribon.io/shared/config";
import SupportCausePage from ".";

const mockCause = causeFactory();
const mockCause2 = causeFactory({ id: 2, name: "💊 Health" });

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause, mockCause2],
    refetch: () => {},
  }),
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
