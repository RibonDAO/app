import { screen, render, fireEvent } from "@testing-library/react-native";
import Accordion from ".";

describe("CardCenterImageButton", () => {
  it("should render without error", async () => {
    render(
      <Accordion
        title="titleTest"
        subtitle="subTest"
        iconUrl="testUrl"
        description="descTest"
        quantity={3}
        isExpansible
      />,
    );

    expect(screen.getByText("titleTest")).toBeDefined();
    expect(screen.getByText("subTest")).toBeDefined();
    expect(screen.queryByText("descTest")).toBeNull();

    fireEvent(screen.getByText("titleTest"), "pressIn");
    const description = await screen.findByText("descTest");
    expect(description).toBeDefined();
  });
});
