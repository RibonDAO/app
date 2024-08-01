import { render, screen } from "@testing-library/react-native";
import { waitForPromises } from "config/testUtils";
import React from "react";
import ClubMonthlyTicketCard from ".";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
  // ...
}));

describe("ClubMonthlyTicketCard before collect and is not a club member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = false;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubMonthlyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isClubMember={false}
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(
      screen.getByText("monthlyTicketCard.buttonTextNoClub"),
    ).toBeDefined();
  });
});

describe("ClubMonthlyTicketCard before collect and is a club member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = false;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubMonthlyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isClubMember
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(screen.getByText("monthlyTicketCard.buttonText")).toBeDefined();
  });
});

describe("ClubMonthlyTicketCard after collect and is a club member", () => {
  beforeEach(async () => {
    const isLoading = false;
    const hasCollected = true;
    React.useState = jest
      .fn()
      .mockReturnValueOnce([isLoading, () => null])
      .mockReturnValueOnce([hasCollected, () => null])
      .mockImplementation((x) => [x, () => null]);

    render(
      <ClubMonthlyTicketCard
        refetchTickets={jest.fn()}
        setUnauthorizedModalVisible={jest.fn()}
        isClubMember
      />,
    );
    await waitForPromises();
  });

  it("renders without error", () => {
    expect(
      screen.getByText("monthlyTicketCard.buttonTextCollected"),
    ).toBeDefined();
  });
});
