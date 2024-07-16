import { renderComponent } from "config/testUtils/renders";
import { screen } from "@testing-library/react-native";
import TicketOutlinedIcon from "components/vectors/TicketOutlinedIcon";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import StatisticsCard from ".";

describe("StatisticsCard", () => {
  it("should render correctly with TicketOutlinedIcon", () => {
    renderComponent(
      <StatisticsCard
        description="Description"
        icon={<TicketOutlinedIcon />}
        value={100}
        backgroundColor="#000"
        handlePress={() => {}}
      />,
    );
    expectTextToBeInTheDocument("100");
    expectTextToBeInTheDocument("Description");
    expect(screen.queryByTestId("icon")).toBeTruthy();
  });
});
