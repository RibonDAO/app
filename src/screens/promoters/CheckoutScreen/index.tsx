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
import Header from "./Components/Header";
import CryptoSection from "./CryptoSection";
import CardSection from "./CardSection";
import S from "./styles";

export default function CheckoutScreen(): JSX.Element {
  const { params } = useRouteParams<"CheckoutScreen">();

  const {
    target: targetParam,
    targetId: targetIdParam,
    offer: offerParam,
    currency: currencyParam,
  } = params;

  const { setTarget, setTargetId, setOffer, setCurrency, currency } =
    useCheckoutContext();

  useEffect(() => {
    if (targetIdParam) setTargetId(targetIdParam);
    if (targetParam) setTarget(targetParam);
    if (offerParam) setOffer(offerParam);
    if (currencyParam) setCurrency(currencyParam);
  }, []);

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
          {currency === "USDC" ? <CryptoSection /> : <CardSection />}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
