import React from "react";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import LoadingOverlay from ".";

describe("LoadingOverlay", () => {
  it("should render without error", () => {
    renderComponent(<LoadingOverlay text="carregando..." visible />);
    expectTextToBeInTheDocument("carregando...");
  });
});
