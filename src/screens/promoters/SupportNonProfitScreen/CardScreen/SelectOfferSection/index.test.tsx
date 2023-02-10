import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { waitForPromises } from "config/testUtils";
import { offerFactory } from "@ribon.io/shared/config";
import OfferSelectionSection from ".";

const mockOffer = offerFactory({ priceValue: 50, currency: "usd" });
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useOffers: () => ({
    offers: [mockOffer],
    refetch: jest.fn(),
  }),
}));

describe("OfferSelectionSection", () => {
  const mockFn = jest.fn();

  beforeEach(async () => {
    renderComponent(
      <OfferSelectionSection
        setCurrentOffer={mockFn}
        currentOfferIndex={0}
        currentOffer={mockOffer}
        setCurrentOfferIndex={mockFn}
        onOfferChange={mockFn}
      />,
    );
    await waitForPromises();
  });

  it("show the first offer", () => {
    expectTextToBeInTheDocument(
      formatPrice(mockOffer.priceValue, mockOffer.currency),
    );
  });
});
