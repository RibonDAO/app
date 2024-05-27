import { render, screen } from "@testing-library/react-native";
import React from "react";
import DailyTicketCard from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  // ...
}));

describe("DailyTicketCard before collect", () => {
  beforeEach(() => {
    const isLoading = false;
    const hasCollected = false;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(<DailyTicketCard />);
  });

  it("renders without error", () => {
    expect(screen.getByText("dailyTicketCard.buttonText")).toBeDefined();
  });
});

describe("DailyTicketCard after collect", () => {
  beforeEach(() => {
    const isLoading = false;
    const hasCollected = true;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(<DailyTicketCard />);
  });

  it("renders without error", () => {
    expect(
      screen.getByText("dailyTicketCard.buttonTextCollected"),
    ).toBeDefined();
  });
});
