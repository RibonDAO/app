import TransferTicketAnimation from "components/moleculars/TransferTicketAnimation";
import UserIcon from "components/vectors/UserIcon";
import Image from "components/atomics/Image";
import { View } from "react-native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import TopMountainShapes from "components/vectors/TopMountainShapes";
import { useNavigation } from "@react-navigation/native";
import { useUserProfile } from "@ribon.io/shared/hooks";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onAnimationEnd: () => void;
  shouldRepeatAnimation: boolean;
};
function DonationInProgressSection({
  nonProfit,
  onAnimationEnd,
  shouldRepeatAnimation,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });
  const navigation = useNavigation();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();

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
          shouldRepeat={shouldRepeatAnimation}
          onAnimationEnd={onAnimationEnd}
          senderIcon={
            profile?.photo ? (
              <Image
                style={S.nonProfitLogo}
                source={{ uri: profile?.photo }}
                accessibilityIgnoresInvertColors
              />
            ) : (
              <UserIcon />
            )
          }
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
