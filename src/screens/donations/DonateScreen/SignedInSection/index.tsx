import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { NonProfit } from "@ribon.io/shared/types";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapes from "components/vectors/BackgroundShapes";
import useDonationFlow from "hooks/useDonationFlow";
import S from "./styles";

type Props = {
  nonProfit: NonProfit;
  onContinue: () => void;
  onDonationSuccess: () => void;
  onDonationFail: (error: any) => void;
};
function SignedInSection({
  nonProfit,
  onContinue,
  onDonationSuccess,
  onDonationFail,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen.signedInSection",
  });
  const { currentUser } = useCurrentUser();
  const { handleDonate } = useDonationFlow();
  const { formattedImpactText } = useFormattedImpactText();

  const handleButtonPress = async () => {
    if (!currentUser?.email) return;

    onContinue();

    try {
      await handleDonate({
        nonProfit,
        email: currentUser.email,
        onError: onDonationFail,
        onSuccess: onDonationSuccess,
      });
      onDonationSuccess();
    } catch (error: any) {
      onDonationFail(error);
    }
  };

  return (
    <View style={S.container}>
      <View style={S.imageContainer}>
        <View style={S.imageBackground}>
          <BackgroundShapes />
        </View>
        <Image
          style={S.mainImage}
          source={{ uri: nonProfit.mainImage }}
          accessibilityIgnoresInvertColors
        />
      </View>
      <View style={S.contentContainer}>
        <Text style={S.title}>{t("title")}</Text>
        <Text style={S.description}>
          {formattedImpactText(nonProfit, undefined, false, true)}
        </Text>

        <Button
          text={t("confirmDonation")}
          onPress={handleButtonPress}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          customStyles={S.button}
          textColor={theme.colors.neutral[25]}
        />
      </View>
    </View>
  );
}

export default SignedInSection;
