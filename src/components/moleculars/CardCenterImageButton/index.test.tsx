import React from "react";
import { screen, render } from "@testing-library/react-native";
import CardCenterImageButton from ".";

describe("CardCenterImageButton", () => {
  it("should render without error", () => {
    render(
      <CardCenterImageButton
        image=""
        buttonText="OK"
        onClickButton={() => {}}
        iconSubtitle={{ icon: "", text: "" }}
      />,
    );
    expect(screen.getByText("OK")).toBeDefined();
  });
});
