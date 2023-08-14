import { clickOn } from "config/testUtils";
import { renderComponentAsync } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { Text } from "react-native";
import LinkAccordion from ".";

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

describe("LinkAccordion", () => {
  it("should render without error", () => {
    renderComponentAsync(<LinkAccordion isRadio {...props} />);

    expectTextToBeInTheDocument("Credit Card");
    expectTextToBeInTheDocument("Google Play");
    expectTextToBeInTheDocument("Apple Pay");
  });

  describe("when the component is not visible and don't have text", () => {
    it("does not show", () => {
      renderComponentAsync(<LinkAccordion isRadio {...props} />);

      expectTextNotToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when the component is visible and has a current", () => {
    it("shows the current item", () => {
      renderComponentAsync(<LinkAccordion isRadio {...props} current={0} />);

      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });

  describe("when element is clicked", () => {
    it("shows the children", () => {
      renderComponentAsync(<LinkAccordion isRadio {...props} />);

      clickOn("Credit Card");
      expectTextToBeInTheDocument("Credit Card is Visible");
    });
  });
});
