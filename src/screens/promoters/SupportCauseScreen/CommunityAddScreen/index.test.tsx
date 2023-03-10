import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SupportWithCommunityPage from ".";

describe("SupportWithCommunityPage", () => {
  it("should render without error", async () => {
    await renderComponentAsync(
      <SupportWithCommunityPage
        navigation={{} as any}
        route={{
          params: { amount: "R$ 20,00" },
          name: "CommunityAddModal",
          key: "",
        }}
      />,
    );

    expectTextToBeInTheDocument(
      "How does the community increase your R$ 20,00 donation?",
    );
  });
});
