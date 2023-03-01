import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import GroupButtons from ".";

describe("GroupButtons", () => {
  it("renders without error", async () => {
    await renderComponentAsync(
      <GroupButtons
        elements={[{ name: "button 1" }, { name: "button 2" }]}
        nameExtractor={(element) => element.name}
      />,
    );

    expectTextToBeInTheDocument("button 1");
    expectTextToBeInTheDocument("button 2");
  });
});
