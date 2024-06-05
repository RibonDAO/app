import React from "react";
import { NonProfit } from "@ribon.io/shared";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { clickOn } from "config/testUtils";
import LastCard from ".";

const mockNonProfit = {
  logo: "https://example.com/logo.png",
  name: "Non-Profit Name",
} as NonProfit;

const primaryButtonClick = jest.fn();
const secondaryButtonClick = jest.fn();

describe("LastCard Component", () => {
  beforeEach(() => {
    renderComponent(
      <LastCard
        nonProfit={mockNonProfit}
        primaryButtonClick={primaryButtonClick}
        secondaryButtonClick={secondaryButtonClick}
      />,
    );
  });

  it("should render buttons with correct text and styles", () => {
    renderComponent(
      <LastCard
        nonProfit={mockNonProfit}
        primaryButtonClick={primaryButtonClick}
        secondaryButtonClick={secondaryButtonClick}
      />,
    );
    expectTextToBeInTheDocument("Non-Profit Name");
    expectTextToBeInTheDocument("Donate tickets");
    expectTextToBeInTheDocument("Donate money");
  });

  it("should call primaryButtonClick when the primary button is clicked", () => {
    renderComponent(
      <LastCard
        nonProfit={mockNonProfit}
        primaryButtonClick={primaryButtonClick}
        secondaryButtonClick={secondaryButtonClick}
      />,
    );
    clickOn("Donate tickets");

    expect(primaryButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should call secondaryButtonClick when the secondary button is clicked", () => {
    renderComponent(
      <LastCard
        nonProfit={mockNonProfit}
        primaryButtonClick={primaryButtonClick}
        secondaryButtonClick={secondaryButtonClick}
      />,
    );
    clickOn("Donate money");
    expect(secondaryButtonClick).toHaveBeenCalledTimes(1);
  });
});
