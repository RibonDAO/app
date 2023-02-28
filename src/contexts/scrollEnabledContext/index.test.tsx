import { renderComponent } from "../../../../ribon-interface/src/config/testUtils";
import { expectTextToBeInTheDocument } from "../../../../ribon-interface/src/config/testUtils/expects";
import { useScrollEnabled } from "./index";

function ScrollEnabledTestPage(){
  useScrollEnabled();
  return <div>ScrollEnabled</div>
}

describe("useScrollEnabled", () => {
  it("renders without error", () => {
    renderComponent(<ScrollEnabledTestPage />);
    expectTextToBeInTheDocument("ScrollEnabled");
  });
});
