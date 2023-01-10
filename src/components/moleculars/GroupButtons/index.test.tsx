import GroupButtons from ".";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("GroupButtons", () => {
  it("renders without error", () => {
    renderComponent(
      <GroupButtons
        elements={[{ name: "button 1" }, { name: "button 2" }]}
        nameExtractor={(element) => element.name}
      />,
    );

    expectTextToBeInTheDocument("button 1");
    expectTextToBeInTheDocument("button 2");
  });
});
