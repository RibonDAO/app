import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { waitForPromises } from "config/testUtils";
import OfferSelectionSection from ".";

const mockOffer = { priceValue: 50, currency: "USD" };
const mockCause = { name: "Cause", id: 1, active: true, pools: [] };
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
