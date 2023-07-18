import storePayApi from ".";
import api from "..";

describe("storePayApi", () => {
  describe("#postStorePay", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      const data = {
        offerId: 1,
        paymentMethodId: 1,
        email: "test@ribon.io",
        name: "Test",
        country: "Brazil",
        city: "São Paulo",
        state: "SP",
        integrationId: 1,
        causeId: 1,
        nonProfitId: 5,
        paymentMethodType: "apple_pay",
      };

      storePayApi.postStorePay(data);

      expect(api.post).toHaveBeenCalledWith("/api/v1/payments/store_pay", data);
    });
  });
});
