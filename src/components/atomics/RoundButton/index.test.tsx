import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import RoundButton from ".";

describe("RoundButton", () => {
  const mockFn = jest.fn();

  beforeEach(async () => {
    await renderComponentAsync(<RoundButton text="text" onPress={mockFn} />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("text");
  });

  it("calls the mockFn when clicked", () => {
    clickOn("text");
    expect(mockFn).toHaveBeenCalled();
  });
});
