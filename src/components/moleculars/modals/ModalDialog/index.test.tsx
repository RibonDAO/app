import React from "react";
import { renderComponentAsync } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ModalDialog from ".";

describe("ModalDialog", () => {
  it("should render without error", async () => {
    await renderComponentAsync(
      <ModalDialog
        title="Modal"
        description="carregando..."
        visible
        setVisible={() => {}}
      />,
    );
    expectTextToBeInTheDocument("carregando...");
  });
});
