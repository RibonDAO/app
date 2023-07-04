import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import UserIcon from "components/vectors/UserIcon";
import Image from "components/atomics/Image";
import { View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
};
function DonationInProgressSection({ nonProfit, onAnimationEnd }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });

  return (
    <View style={S.animationContainer}>
      <TransferTicketAnimation
        onAnimationEnd={onAnimationEnd}
        senderIcon={<UserIcon />}
        receiverIcon={
          <Image
            style={S.nonProfitLogo}
            source={{ uri: nonProfit.logo }}
            accessibilityIgnoresInvertColors
          />
        }
        description={t("animationText").toString()}
      />
    </View>
  );
}

export default DonationInProgressSection;
