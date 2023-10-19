import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { waitForPromises } from "config/testUtils";
import { offerFactory, causeFactory } from "@ribon.io/shared/config";
import OfferSelectionSection from ".";

const mockOffer = offerFactory({ priceValue: 50, currency: "usd" });
const mockCause = causeFactory({
  name: "Cause",
  id: 1,
  status: "active",
  pools: [],
});
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
      <OfferSelectionSection cause={mockCause} onOfferChange={mockFn} />,
    );
    await waitForPromises();
  });

  it("show the first offer", () => {
    expectTextToBeInTheDocument(
      formatPrice(mockOffer.priceValue, mockOffer.currency),
    );
  });
});
