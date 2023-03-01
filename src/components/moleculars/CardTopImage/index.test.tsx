import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardTopImage from ".";

describe("CardTopImage", () => {
  it("should render without error", async () => {
    await renderComponentAsync(<CardTopImage imageUrl="" text="text" />);

    expectTextToBeInTheDocument("text");
  });
});
