import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GiftCycleSection from ".";

describe("GiftCycleSection", () => {
  it("renders without error", () => {
    renderComponentAsync(<GiftCycleSection />);

    expectTextToBeInTheDocument("Updated in real time");
  });
});
