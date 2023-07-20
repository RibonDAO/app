import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { causeFactory } from "@ribon.io/shared/config";
import ContributionStatsScreen from ".";

const mockContribution = {
  stats: { totalContributors: 1, initialAmount: "R$10" },
  receiver: causeFactory({ name: "animal" }),
};
jest.mock("@ribon.io/shared/hooks", () => ({
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useContributions: () => ({
    useContributionStats: () => ({ data: mockContribution }),
  }),
}));
jest.mock("hooks/useRouteParams", () => ({
  useRouteParams: () => ({ params: { contributionId: "1" } }),
}));

describe("ContributionStatsScreen", () => {
  it("renders without error", () => {
    renderComponentAsync(<ContributionStatsScreen />);

    expectTextToBeInTheDocument("You donated R$10 for animal");
  });
});
