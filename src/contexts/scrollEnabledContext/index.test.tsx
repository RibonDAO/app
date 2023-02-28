import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useScrollEnabled } from ".";

function ScrollEnabledTestPage() {
  useScrollEnabled();
  return <div>ScrollEnabled</div>;
}

describe("useScrollEnabled", () => {
  it("renders without error", () => {
    renderComponent(<ScrollEnabledTestPage />);
    expectTextToBeInTheDocument("ScrollEnabled");
  });
});
