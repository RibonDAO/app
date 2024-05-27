import { Text, View } from "react-native";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import { useCouponContext } from ".";

function CouponTestPage() {
  const { setCouponId, couponId } = useCouponContext();
  setCouponId("1");
  return (
    <View>
      <Text>Coupon</Text>
      <Text>{couponId}</Text>
    </View>
  );
}

describe("useCoupons", () => {
  it("renders without error", async () => {
    renderComponent(<CouponTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Coupon");
  });

  describe("Coupon", () => {
    it("starts with 1 Coupon", async () => {
      renderComponent(<CouponTestPage />);
      await waitForPromises();

      expectTextToBeInTheDocument("1");
    });
  });
});
