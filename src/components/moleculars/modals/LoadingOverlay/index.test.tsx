import React from "react";
import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import LoadingOverlay from ".";

describe("LoadingOverlay", () => {
  it("should render without error", async () => {
    await renderComponentAsync(<LoadingOverlay text="carregando..." visible />);
    expectTextToBeInTheDocument("carregando...");
  });
});
