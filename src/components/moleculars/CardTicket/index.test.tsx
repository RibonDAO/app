import * as React from "react";
import { theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import TicketWhiteIcon from "components/vectors/TicketWhiteIcon";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react-native";
import { clickOn } from "config/testUtils";
import CardTicket from ".";

describe("CardTicket", () => {
  const mockFn = jest.fn();

  beforeEach(async () => {
    renderComponent(
      <CardTicket
        title="title"
        subtitle={{
          icon: <TicketWhiteIcon />,
          text: "subtitle",
          color: theme.colors.brand.primary[900],
        }}
      >
        <Button
          text="text"
          textColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[50]}
          backgroundColor={theme.colors.brand.primary[50]}
          leftIcon={{
            name: "check",
            color: theme.colors.brand.primary[600],
            type: "outlined",
            size: 24,
          }}
          onPress={mockFn}
        />
      </CardTicket>,
    );
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("title");
    expectTextToBeInTheDocument("subtitle");
    expect(screen.getByText("text")).toBeDefined();
  });

  it("calls the mockFn when clicked", () => {
    clickOn("text");
    expect(mockFn).toHaveBeenCalled();
  });
});
