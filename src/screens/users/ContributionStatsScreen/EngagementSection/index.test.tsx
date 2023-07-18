import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import EngagementSection from ".";

describe("EngagementSection", () => {
  it("renders without error", () => {
    renderComponentAsync(
      <EngagementSection totalDonors="10" totalContributors="5" />,
    );

    expectTextToBeInTheDocument("10");
    expectTextToBeInTheDocument("5");
    expectTextToBeInTheDocument("people have already donated tickets");
    expectTextToBeInTheDocument("donated money inspired by you");
  });
});
