import { waitForPromises } from "config/testUtils";
import {
  expectAllByTextToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { nonProfitFactory } from "@ribon.io/shared/config";
import NonProfitsList from ".";

const mockNonProfit1 = nonProfitFactory({
  id: 1,
  name: "Evidence Action",
  stories: [
    {
      id: 1,
      description: "Story 1",
      title: "",
      image: "",
    },
    {
      id: 2,
      description: "Story 2",
      title: "",
      image: "",
    },
  ],
});

const mockNonProfit2 = nonProfitFactory({
  id: 2,
  name: "Lwala",
});

describe("NonProfitsList", () => {
  beforeEach(async () => {
    renderComponent(
      <NonProfitsList nonProfits={[mockNonProfit1, mockNonProfit2]} />,
    );
    await waitForPromises();
  });

  it("should render without error", () => {
    expectAllByTextToBeInTheDocument("Evidence Action");
    expectTextToBeInTheDocument("Donate tickets");
    expectTextToBeInTheDocument("Lwala");
    expectTextToBeInTheDocument("Story 1");
    expectTextToBeInTheDocument("Story 2");
  });
});
