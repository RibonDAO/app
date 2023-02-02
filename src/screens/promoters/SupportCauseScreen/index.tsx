import React from "react";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoScreen";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";

export default function SupportCauseScreen() {
  const { isInCryptoPage } = useCryptoPayment();

  if (isInCryptoPage) {
    return <CryptoPage />;
  }

  return <CardScreen />;
}
