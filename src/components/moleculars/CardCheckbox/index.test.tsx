import { screen, render } from "@testing-library/react-native";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import CardCheckbox from ".";

describe("CardCheckbox", () => {
  it("should render without error", () => {
    render(
      <CardCheckbox
        firstDescription="CardCheckbox"
        firstIconName="confirmation_number"
        secondDescription="secondDescription"
        secondIconName="box"
        value="R$10,00"
        recurrence="month"
      />,
    );

    expectTextToBeInTheDocument("CardCheckbox");
    expectTextToBeInTheDocument("R$10,00");
    expectTextToBeInTheDocument("month");
    expectTextToBeInTheDocument("secondDescription");
  });

  describe("when tagText is passed", () => {
    it("should render tagText", () => {
      render(
        <CardCheckbox
          firstDescription="CardCheckbox"
          firstIconName="confirmation_number"
          secondDescription="secondDescription"
          secondIconName="box"
          value="R$10,00"
          recurrence="month"
          tagText="Most popular"
        />,
      );

      expectTextToBeInTheDocument("Most popular");
    });
  });

  describe("when checked is passed", () => {
    it("should render checked", () => {
      render(
        <CardCheckbox
          firstDescription="CardCheckbox"
          firstIconName="confirmation_number"
          secondDescription="secondDescription"
          secondIconName="box"
          value="R$10,00"
          recurrence="month"
          checked
        />,
      );

      expectTextToBeInTheDocument("CardCheckbox");
      expectTextToBeInTheDocument("R$10,00");
      expectTextToBeInTheDocument("month");
      expectTextToBeInTheDocument("secondDescription");
    });
  });

  describe("when onClick is passed", () => {
    const onClick = jest.fn();
    beforeEach(() => {
      render(
        <CardCheckbox
          firstDescription="CardCheckbox"
          firstIconName="confirmation_number"
          secondDescription="secondDescription"
          secondIconName="box"
          value="R$10,00"
          recurrence="month"
          onClick={onClick}
        />,
      );
    });
    it("should call onClick when clicked", () => {
      const cardElement = screen.getByTestId("card-checkbox");
      clickOn(cardElement);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
