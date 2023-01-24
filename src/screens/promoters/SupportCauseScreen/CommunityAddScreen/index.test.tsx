import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SupportWithCommunityPage from ".";

jest.mock("hooks/useNavigation", () => ({
    __esModule: true,
    useNavigation: () => jest.fn(),
}));
describe("SupportWithCommunityPage", () => {
  it("should render without error", () => {
    renderComponent(
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
