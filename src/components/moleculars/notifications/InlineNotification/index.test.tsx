import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import { screen } from "@testing-library/react-native";
import InlineNotification from ".";

describe("InlineNotification", () => {
  const onCloseClick = jest.fn();
  const onFirstLinkClick = jest.fn();
  const onSecondLinkClick = jest.fn();

  beforeEach(async () => {
    await renderComponentAsync(
      <InlineNotification
        title="title"
        description="description"
        type="success"
        firstLink="first link"
        secondLink="second link"
        onCloseClick={onCloseClick}
        onFirstLinkClick={onFirstLinkClick}
        onSecondLinkClick={onSecondLinkClick}
      />,
    );
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("title");
    expectTextToBeInTheDocument("description");
    expectTextToBeInTheDocument("first link");
    expectTextToBeInTheDocument("second link");
  });

  it("calls the onClose when close icon is pressed", () => {
    const element = screen.getByAccessibilityHint("close-icon");
    clickOn(element);

    expect(onCloseClick).toHaveBeenCalled();
  });

    it("calls the onLinkClick when links are clicked", () => {
        clickOn("first link");
        expect(onFirstLinkClick).toHaveBeenCalled();

        clickOn("second link");
        expect(onSecondLinkClick).toHaveBeenCalled();
    });
});
