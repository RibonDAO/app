import React from "react";
import { screen, render } from "@testing-library/react-native";
import ArticleLayout from ".";
import { RibonOnboarding } from "utils/constants/Articles";

describe("CardCenterImageButton", () => {
  it("should render without error", () => {
    const article = {
      id: 1,
      title: "Ribon",
      link: "https://ribon.io",
      imageUrl: "https://ribon.io",
      publishedAt: "2021-01-01",
      publishedAtInWords: "1 day ago",
      visible: true,
      author: {
        id: 1,
        name: "Ribon",
      },
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    };
    render(<ArticleLayout article={article} readMoreText="Read now" />);
    expect(screen.getByText("Read now")).toBeDefined();
  });
});
