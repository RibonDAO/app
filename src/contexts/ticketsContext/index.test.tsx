import { Text, View } from "react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import { useTickets } from ".";

function TicketsTestPage() {
  const { ticketsCounter: tickets, hasTickets } = useTickets();
  return (
    <View>
      <Text>Tickets</Text>
      <Text>{tickets}</Text>
      {hasTickets ? <Text>Has tickets</Text> : <Text>No tickets</Text>}
    </View>
  );
}

describe("useTickets", () => {
  it("renders without error", async () => {
    renderComponent(<TicketsTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Tickets");
  });

  describe("tickets", () => {
    it("starts with 1 tickets", async () => {
      renderComponent(<TicketsTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("1");
    });
  });
});
