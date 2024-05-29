import { waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";

import TagsFilter from ".";

const mockTag = {
  id: 1,
  name: "Tag 1",
  status: "active",
  nonProfits: [],
};

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useTags: () => ({
    tags: [mockTag],
    refetch: () => {},
  }),
}));

describe("TagsFilter", () => {
  beforeEach(async () => {
    renderComponent(<TagsFilter />);
    await waitForPromises();
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("All");
  });

  it("should render the tags", () => {
    expectTextToBeInTheDocument("Tag 1");
  });
});
