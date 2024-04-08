import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardReport from "./index";

describe("CardReport", () => {
  beforeEach(async () => {
    renderComponent(
      <CardReport title="Report →" link="https://ribon.io" showIcon />,
    );
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("Report →");
  });
});
