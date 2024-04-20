import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import CollectableButton from ".";

describe("CollectableButton", () => {
  const mockFn = jest.fn();

  beforeEach(async () => {
    await renderComponentAsync(
      <CollectableButton text="text" afterText="clicked" onClick={mockFn} />,
    );
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("text");
  });

  it("calls the mockFn when clicked", () => {
    clickOn("text");
    expect(mockFn).toHaveBeenCalled();
  });
});
