import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import NewTicketAnimation from ".";

describe("NewTicketAnimation", () => {
  beforeEach(async () => {
    await renderComponentAsync(<NewTicketAnimation count={1} />);
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("+1");
  });
});
