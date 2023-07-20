import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import BoostSection from ".";

describe("BoostSection", () => {
  it("renders without error", () => {
    renderComponentAsync(<BoostSection totalAmountToCause="R$10,00" />);

    expectTextToBeInTheDocument("↑ R$10,00");
    expectTextToBeInTheDocument("Total raised for your cause so far");
  });
});
