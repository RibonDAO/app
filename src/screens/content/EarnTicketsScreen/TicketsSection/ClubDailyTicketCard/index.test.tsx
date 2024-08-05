import { screen, render } from "@testing-library/react-native";
import { waitForPromises } from "config/testUtils";
import React from "react";
import ClubDailyTicketCard from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  // ...
}));

describe("ClubDailyTicketCard before collect and is not club member", () => {
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
        isClubMember={false}
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(screen.getByText("dailyTicketCard.buttonTextNoClub")).toBeDefined();
  });
});

describe("ClubDailyTicketCard before collect and is club member", () => {
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
        isClubMember
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(screen.getByText("dailyTicketCard.buttonText")).toBeDefined();
  });
});

describe("ClubDailyTicketCard after collect and is club member", () => {
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
        isClubMember
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
