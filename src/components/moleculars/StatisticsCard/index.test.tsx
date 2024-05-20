import { renderComponent } from "config/testUtils/renders";
import { screen } from "@testing-library/react-native";
import StatisticsCard from ".";

describe("StatisticsCard", () => {
  it("should render correctly with TicketIconOutlined", () => {
    renderComponent(
      <StatisticsCard
        description="Description"
        icon="TicketIconOutlined"
        totalDonated="100"
        backgroundColor="#000"
      />,
    );
    expect(screen.getByText("100")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
  });

  it("should render correctly with RibonFlagIcon", () => {
    renderComponent(
      <StatisticsCard
        totalDonated="200"
        description="Another Description"
        icon="RibonFlagIcon"
        backgroundColor=""
      />,
    );
    expect(screen.getByText("200")).toBeTruthy();
    expect(screen.getByText("Another Description")).toBeTruthy();
  });
});
