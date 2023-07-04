import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import Button from "components/atomics/buttons/Button";
import { NonProfit } from "@ribon.io/shared/types";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import { useDonations } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";

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
  const { donate } = useDonations(currentUser?.id);
  const { formattedImpactText } = useFormattedImpactText();

  const handleButtonPress = async () => {
    if (!currentUser?.email) return;

    onContinue();

    try {
      await donate(
        RIBON_INTEGRATION_ID,
        nonProfit.id,
        currentUser.email,
        PLATFORM,
      );
      onDonationSuccess();
    } catch (error: any) {
      onDonationFail(error);
    }
  };

  return (
    <View>
      <Image
        source={{ uri: nonProfit.mainImage }}
        accessibilityIgnoresInvertColors
      />
      <Text>{t("title")}</Text>
      <Text>{formattedImpactText(nonProfit, undefined, false, true)}</Text>

      <Button text={t("confirmDonation")} onPress={handleButtonPress} />
    </View>
  );
}

export default SignedInSection;
