import { renderComponent } from "config/testUtils/renders";
import Button from ".";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";

describe("Button", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    renderComponent(<Button text="text" onPress={mockFn} />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("text");
  });

  it("calls the mockFn when clicked", () => {
    clickOn("text");
    expect(mockFn).toHaveBeenCalled();
  });
});
