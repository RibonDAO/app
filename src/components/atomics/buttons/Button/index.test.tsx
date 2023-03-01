import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import Button from ".";

describe("Button", () => {
  const mockFn = jest.fn();

  beforeEach(async () => {
    await renderComponentAsync(<Button text="text" onPress={mockFn} />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("text");
  });

  it("calls the mockFn when clicked", () => {
    clickOn("text");
    expect(mockFn).toHaveBeenCalled();
  });
});
