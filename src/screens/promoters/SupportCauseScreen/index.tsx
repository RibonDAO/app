import React, { useState } from "react";
import { RootTabScreenProps } from "types";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoPage";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";

export default function SupportCauseScreen({
  navigation,
}: RootTabScreenProps<"PromotersScreen">) {
  const { isInCryptoPage } = useCryptoPayment();

  if (isInCryptoPage) {
    return <CryptoPage />;
  }

  return <CardScreen />;
}
