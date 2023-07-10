import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import UserIcon from "components/vectors/UserIcon";
import Image from "components/atomics/Image";
import { View } from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import TopMountainShapes from "components/vectors/TopMountainShapes";
import { useNavigation } from "@react-navigation/native";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
};
function DonationInProgressSection({ nonProfit, onAnimationEnd }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    return () => {
      navigation.setOptions({ headerShown: true });
    };
  }, []);

  return (
    <View style={S.animationContainer}>
      <TopMountainShapes />
      <View style={S.centerContainer}>
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
    </View>
  );
}

export default DonationInProgressSection;
