import { clickOn } from "config/testUtils";
import { renderComponentAsync } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { Text } from "react-native";
import RadioAccordion from ".";

const props = {
  items: [
    {
      title: "Credit Card",
      children: <Text>Credit Card is Visible</Text>,
    },
    {
      title: "Google Play",
      onClick: () => {},
    },
    {
      title: "Apple Pay",
      onClick: () => {},
    },
  ],
};

describe("RadioAccordion", () => {
  it("should render without error", () => {
    renderComponentAsync(<RadioAccordion {...props} />);

    expectTextToBeInTheDocument("Credit Card");
    expectTextToBeInTheDocument("Google Play");
    expectTextToBeInTheDocument("Apple Pay");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponentAsync(<RadioAccordion {...props} />);

      expectTextNotToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when the component is visible and has a current", () => {
    it("shows the current item", () => {
      renderComponentAsync(<RadioAccordion {...props} current={0} />);

      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when element is clicked", () => {
    it("shows the children", () => {
      renderComponentAsync(<RadioAccordion {...props} />);

      clickOn("Credit Card");
      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });
});
