import React, { useEffect } from "react";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoScreen";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import Placeholder from "./placeholder";
import { logEvent } from "services/analytics";

function SupportCauseScreen() {
  useEffect(() => {
    logEvent("P5_view");
  }, []);
  const { isInCryptoPage } = useCryptoPayment();

  return isInCryptoPage ? <CryptoPage /> : <CardScreen />;
}
export default withPlaceholder(SupportCauseScreen, Placeholder);
