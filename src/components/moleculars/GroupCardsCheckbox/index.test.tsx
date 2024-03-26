import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { render } from "@testing-library/react-native";
import GroupCardsCheckbox from ".";

describe("GroupCardsCheckbox", () => {
  const elements = [
    {
      firstDescription: "3 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 10 tickets every month",
      secondIconName: "box",
      value: "R$10,00",
      recurrence: "month",
    },
    {
      firstDescription: "8 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 25 tickets every month",
      secondIconName: "box",
      value: "R$11,80",
      recurrence: "month",
    },
    {
      firstDescription: "10 extra daily tickets",
      firstIconName: "confirmation_number",
      secondDescription: "Package of 30 tickets every month",
      secondIconName: "box",
      value: "R$142,00",
      recurrence: "year",
    },
  ];
  it("should render without error", () => {
    render(<GroupCardsCheckbox elements={elements} />);

    expectTextToBeInTheDocument("3 extra daily tickets");
    expectTextToBeInTheDocument("Package of 10 tickets every month");
    expectTextToBeInTheDocument("8 extra daily tickets");
    expectTextToBeInTheDocument("Package of 25 tickets every month");
    expectTextToBeInTheDocument("R$10,00");
    expectTextToBeInTheDocument("R$11,80");
    expectTextToBeInTheDocument("R$142,00");
  });
});
