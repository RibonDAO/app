import { renderComponent } from "config/testUtils/renders";
import { screen } from "@testing-library/react-native";
import StatisticsCard from ".";

describe("StatisticsCard", () => {
  it("should render correctly with TicketColorsIcon", () => {
    renderComponent(
      <StatisticsCard
        description="Description"
        icon="TicketColorsIcon"
        value={100}
        backgroundColor="#000"
      />,
    );
    expect(screen.getByText("100")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
  });

  it("should render correctly with CalendarIcon", () => {
    renderComponent(
      <StatisticsCard
        value={200}
        description="Another Description"
        icon="CalendarIcon"
        backgroundColor=""
      />,
    );
    expect(screen.getByText("200")).toBeTruthy();
    expect(screen.getByText("Another Description")).toBeTruthy();
  });
});
