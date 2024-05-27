import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CollectableButton from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  // ...
}));

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
});
