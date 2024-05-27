import { screen, render } from "@testing-library/react-native";
import { waitForPromises } from "config/testUtils";
import React from "react";
import ClubDailyTicketCard from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  // ...
}));

describe("ClubDailyTicketCard before collect and is not member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = false;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubDailyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isMember={false}
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(screen.getByText("dailyTicketCard.buttonTextNoClub")).toBeDefined();
  });
});

describe("ClubDailyTicketCard before collect and is member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = false;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubDailyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isMember
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(screen.getByText("dailyTicketCard.buttonText")).toBeDefined();
  });
});

describe("ClubDailyTicketCard after collect and is member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = true;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubDailyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isMember
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(
      screen.getByText("dailyTicketCard.buttonTextCollected"),
    ).toBeDefined();
  });
});
