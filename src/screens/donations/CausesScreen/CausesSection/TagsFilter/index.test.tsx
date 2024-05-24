import { waitForPromises } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { causeFactory } from "@ribon.io/shared/config";
import CausesFilter from ".";

const mockCause = causeFactory({
  id: 1,
  name: "Animal",
  withPoolBalance: false,
});

const mockCause2 = causeFactory({
  id: 2,
  name: "Health",
  withPoolBalance: true,
});

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause, mockCause2],
    refetch: () => {},
  }),
}));

describe("CausesFilter", () => {
  beforeEach(async () => {
    renderComponent(<CausesFilter />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("All");
  });

  it("should render the causes with pool balance", () => {
    expectTextToBeInTheDocument("Health");
  });

  it("should not render the causes without pool balance", () => {
    expectTextNotToBeInTheDocument("Animal");
  });
});
