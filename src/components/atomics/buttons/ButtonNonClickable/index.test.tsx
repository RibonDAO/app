import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Button from ".";

describe("Button", () => {
  beforeEach(async () => {
    await renderComponentAsync(<Button text="text" />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("text");
  });
});
