const stripe = {
  StripeProvider: jest.fn(({ children }) => children),
  CardField: jest.fn(() => null),
  presentPaymentSheet: jest.fn(),
  initPaymentSheet: jest.fn(),
};

export const { StripeProvider } = stripe;
export const { CardField } = stripe;
export const { presentPaymentSheet } = stripe;
export const { initPaymentSheet } = stripe;

export default stripe;
