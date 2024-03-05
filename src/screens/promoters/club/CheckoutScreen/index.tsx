import { useRouteParams } from "hooks/useRouteParams";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect } from "react";
import { useCheckoutContext } from "contexts/checkoutContext";
import usePageView from "hooks/usePageView";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import PaymentPlaceholder from "components/moleculars/PaymentPlaceholder";
import Header from "./Header";
import PaymentMethodSection from "./PaymentMethodSection";
import S from "./styles";
import PriceSection from "./PriceSection";

function CheckoutScreen(): JSX.Element {
  const { params } = useRouteParams<"CheckoutScreen">();

  const {
    target: targetParam,
    offer: offerParam,
    currency: currencyParam,
  } = params;

  const { setTarget, setCurrency, setOfferPrice } = useCheckoutContext();
  usePageView("P23_view", { from: "club", offerParam });

  useEffect(() => {
    if (targetParam) setTarget(targetParam);
    if (offerParam != null) setOfferPrice(offerParam);
    if (currencyParam) setCurrency(currencyParam);
  }, [targetParam, currencyParam, offerParam]);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={S.keyboardView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
    >
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
        style={S.outerContainer}
      >
        <ScrollView style={S.container}>
          <Header />
          <PriceSection />
          <PaymentMethodSection />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default withPlaceholder(CheckoutScreen, PaymentPlaceholder);
