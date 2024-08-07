import { renderComponent } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react-native";
import UserAvatar from ".";

describe("UserAvatar", () => {
  it("renders the basic info", () => {
    renderComponent(<UserAvatar name="Profile name" email="test@test.com" />);

    expectTextToBeInTheDocument("Profile name");
    expectTextToBeInTheDocument("test@test.com");
  });

  it("doesnt render the basic info", () => {
    renderComponent(
      <UserAvatar name="Profile name" email="test@test.com" showInfo={false} />,
    );

    expectTextNotToBeInTheDocument("Profile name");
    expectTextNotToBeInTheDocument("test@test.com");
  });

  it("render the basic user avatar", () => {
    renderComponent(<UserAvatar name="Profile name" email="test@test.com" />);

    expect(screen.queryByTestId("Sparkles")).toBeFalsy();
    expect(screen.queryByTestId("VerifiedIcon")).toBeFalsy();
  });

  it("renders the member user avatar", () => {
    renderComponent(<UserAvatar name="Profile name" isClubMember />);

    expect(screen.queryByTestId("Sparkles")).toBeTruthy();
    expect(screen.queryByTestId("VerifiedIcon")).toBeTruthy();
  });

  it("renders the business user avatar", () => {
    renderComponent(<UserAvatar name="Profile name" isBusinessMember />);

    expect(screen.queryByTestId("BusinessIcon")).toBeTruthy();
  });
});
