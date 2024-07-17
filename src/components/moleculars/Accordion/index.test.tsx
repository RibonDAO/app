import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { fireEvent, screen } from "@testing-library/react-native";

import { renderComponent } from "config/testUtils/renders";
import Accordion from ".";

describe("CardCenterImageButton", () => {
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
    expectTextToBeInTheDocument("titleTest");
    expectTextToBeInTheDocument("subTest");
    expectTextToBeInTheDocument("3");
    expectTextNotToBeInTheDocument("descTest");
  });

  it("should render description when clicked", async () => {
    fireEvent(screen.getByText("titleTest"), "pressIn");
    expectTextToBeInTheDocument("descTest");
  });
});
