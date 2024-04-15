import { clickOn } from "config/testUtils";
import { renderComponent } from "config/testUtils/renders";
import { screen } from "@testing-library/react-native";
import SliderButton from ".";

describe("SliderButton", () => {
  describe("renders", () => {
    beforeEach(() => {
      const props = {
        rangeSize: 10,
        step: 1,
        setValue: jest.fn(),
      };
      renderComponent(<SliderButton {...props} />);
    });
    it("should render without error", () => {
      expect(screen.getByTestId("addButton")).toBeTruthy();
      expect(screen.getByTestId("removeButton")).toBeTruthy();
    });
  });

  describe("when the range is full", () => {
    beforeEach(() => {
      const props = {
        rangeSize: 2,
        step: 1,
        setValue: jest.fn(),
      };
      renderComponent(<SliderButton {...props} />);
      clickOn(screen.getByTestId("addButton"));
    });

    it("blocks the adds button", () => {
      expect(
        screen.getByTestId("addButton").props.accessibilityState?.disabled,
      ).toBeTruthy();
    });

    it("blocks the remove button", () => {
      clickOn(screen.getByTestId("removeButton"));
      clickOn(screen.getByTestId("removeButton"));
      expect(
        screen.getByTestId("removeButton").props.accessibilityState?.disabled,
      ).toBeTruthy();
    });
  });
});
