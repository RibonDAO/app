import React, { useState } from "react";
import { RootTabScreenProps } from "types";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoPage";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";

export default function SupportCauseScreen({
  navigation,
}: RootTabScreenProps<"PromotersScreen">) {
  const [pageType] = useState<"card" | "crypto">("card");

  if (pageType === "crypto") {
    return <CryptoPage />;
  }

  return <CardScreen />;
}
