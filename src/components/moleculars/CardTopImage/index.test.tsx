import CardTopImage from ".";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("CardTopImage", () => {
  it("should render without error", () => {
    renderComponent(<CardTopImage imageUrl="" text="text" />);

    expectTextToBeInTheDocument("text");
  });
});
