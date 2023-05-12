import React, { useEffect } from "react";
import { RootStackScreenProps } from "types";
import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import DoneScreenTemplate from "screens/templates/DoneScreenTemplate";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useSound from "hooks/useSound";
import { TouchableOpacity, View } from "react-native";
import { shareSocial, SocialTypes } from "services/social/shareImage";
import TwitterLogo from "components/vectors/TwitterLogo";
import InstagramLogo from "components/vectors/InstagramLogo";
import WhatsappLogo from "components/vectors/WhatsappLogo";
import donationDoneSound from "./assets/donation-done.mp3";

export default function DonationDoneScreen({
  route,
}: RootStackScreenProps<"DonationDoneScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donationDoneScreen",
  });
  const { nonProfit } = route.params;
  const { navigateTo } = useNavigation();
  const { formattedImpactText } = useFormattedImpactText();
  const { playSound } = useSound();

  const handleContinueClick = () => {
    navigateTo("PostDonationScreen", {
      nonProfit,
      cause: nonProfit.cause,
    });
  };

  useEffect(() => {
    playSound(donationDoneSound);
  }, []);

  const imageUrl =
    "https://media.discordapp.net/attachments/1008571091616276541/1106679413854187630/nicknish_people_happy_drinking_potable_water_cartoon_like_futur_078c80a5-7617-4b7f-8fa9-3a0e46882e3b.png?width=619&height=619";
  const shareTwitter = async () => {
    try {
      await shareSocial(imageUrl, SocialTypes.TWITTER);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <DoneScreenTemplate
        image={nonProfit.mainImage}
        title={t("title") || ""}
        buttonTitle={t("buttonContinueText") || ""}
        onButtonPress={handleContinueClick}
        description={t("description") || ""}
        highlightedDescription={formattedImpactText(
          nonProfit,
          undefined,
          false,
          false,
        )}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={shareTwitter}>
            <TwitterLogo />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareTwitter}>
            <InstagramLogo />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareTwitter}>
            <WhatsappLogo />
          </TouchableOpacity>
        </View>
      </DoneScreenTemplate>
    </View>
  );
}
