import { Button, Text, View } from "react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { clickOn, waitForPromises } from "config/testUtils";
import { useTickets } from ".";

function TicketsTestPage() {
  const { addTicket, removeTicket, hasTickets, tickets } = useTickets();
  return (
    <View>
      <Text>Tickets</Text>
      <Text>{tickets}</Text>
      <Button title="Add" onPress={() => addTicket()} />
      <Button title="Remove" onPress={() => removeTicket()} />
      {hasTickets() ? <Text>Has tickets</Text> : <Text>No tickets</Text>}
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
    it("starts with 0 tickets", async () => {
      renderComponent(<TicketsTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("0");
    });

    it("updates when add or remove ticket", async () => {
      renderComponent(<TicketsTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("0");
      clickOn("Add");
      expectTextToBeInTheDocument("1");
      clickOn("Remove");
      expectTextToBeInTheDocument("0");
    });
  });

  describe("addTicket", () => {
    it("adds a ticket", async () => {
      renderComponent(<TicketsTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("No tickets");
      clickOn("Add");
      expectTextToBeInTheDocument("Has tickets");
    });
  });

  describe("removeTicket", () => {
    it("removes a ticket", async () => {
      renderComponent(<TicketsTestPage />);
      await waitForPromises();
      clickOn("Add");

      expectTextToBeInTheDocument("Has tickets");
      clickOn("Remove");
      expectTextToBeInTheDocument("No tickets");
    });
  });
});
