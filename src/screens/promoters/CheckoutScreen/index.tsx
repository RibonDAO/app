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
import Header from "./Components/Header";
import CardSection from "./CardSection";
import S from "./styles";

function CheckoutScreen(): JSX.Element {
  usePageView("P23_view");
  const { params } = useRouteParams<"CheckoutScreen">();

  const {
    target: targetParam,
    targetId: targetIdParam,
    offer: offerParam,
    currency: currencyParam,
  } = params;

  const { setTarget, setTargetId, setCurrency, setOfferPrice } =
    useCheckoutContext();

  useEffect(() => {
    if (targetIdParam) setTargetId(targetIdParam);
    if (targetParam) setTarget(targetParam);
    if (offerParam != null) setOfferPrice(offerParam);
    if (currencyParam) setCurrency(currencyParam);
  }, [targetParam, currencyParam, targetParam, offerParam]);

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
          <CardSection />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default withPlaceholder(CheckoutScreen, PaymentPlaceholder);
