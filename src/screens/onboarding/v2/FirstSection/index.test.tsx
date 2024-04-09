import { waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import FirstSection from ".";

describe("FirstSection", () => {
  describe("when is the first access to ribon", () => {
    describe("when the integration is Ribon", () => {
      beforeEach(() => {
        renderComponent(<FirstSection />);
        waitForPromises();
      });

      it("renders the Ribon integration with correct title", () => {
        expectTextToBeInTheDocument("Welcome to Ribon!");
      });
    });

    describe("when the integration is not Ribon", () => {
      beforeEach(() => {
        renderComponent(<FirstSection />, {
          integrationProviderValue: {
            currentIntegrationId: 2,
          },
        });
        waitForPromises();
      });

      it("renders the integration with correct title", () => {
        expectTextToBeInTheDocument("invited you to use Ribon's app");
      });
    });
  });
});
