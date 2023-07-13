import React from "react";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoScreen";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import usePageView from "hooks/usePageView";
import Placeholder from "./placeholder";

function SupportCauseScreen() {
  usePageView("P2_view");
  const { isInCryptoPage } = useCryptoPayment();

  return isInCryptoPage ? <CryptoPage /> : <CardScreen />;
}
export default withPlaceholder(SupportCauseScreen, Placeholder);
