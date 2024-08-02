import { screen } from "@testing-library/react-native";
import { renderComponent } from "config/testUtils/renders";
import Accordion from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
}));

describe("Accordion", () => {
  beforeEach(async () => {
    await renderComponent(
      <Accordion
        title="titleTest"
        subtitle="subTest"
        iconUrl="testUrl"
        description="descTest"
        quantity={3}
        isExpansible
      />,
    );
  });
  it("should render without error", async () => {
    expect(screen.getByTestId("placeholder")).toBeTruthy();
  });
});
