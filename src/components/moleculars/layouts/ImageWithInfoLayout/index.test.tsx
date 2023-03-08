import React from "react";
import { screen, render } from "@testing-library/react-native";
import ImageWithInfoLayout from ".";

describe("ImageWithInfoLayout", () => {
  it("should render without error", () => {
    render(<ImageWithInfoLayout title="A Ribon for you" />);
    expect(screen.getByText("A Ribon for you")).toBeDefined();
  });
});
