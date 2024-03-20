import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import usePageView from "hooks/usePageView";
import S from "./styles";
import TicketIcon from "./assets/TicketIcon";
import BoxIcon from "./assets/BoxIcon";
import SmileIcon from "./assets/SmileIcon";
import PinkCircle from "../../assets/pink-circle.png";
import DepoimentsSection from "../DepoimentsSection";

function BenefitsSection(): JSX.Element {
  usePageView("P32_view");
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.benefitsSection",
  });

  return (
    <View>
      <View style={S.cardContainer}>
        <View style={S.container}>
          <View style={S.innerContainer}>
            <TicketIcon />
            <View style={S.textContainer}>
              <Text style={S.title}>{t("firstBenefitTitle")}</Text>
              <Text style={S.description}>{t("firstBenefitDescription")}</Text>
            </View>
          </View>
          <View style={S.innerContainer}>
            <BoxIcon />
            <View style={S.textContainer}>
              <Text style={S.title}>{t("secondBenefitTitle")}</Text>
              <Text style={S.description}>{t("secondBenefitDescription")}</Text>
            </View>
          </View>
          <View style={S.innerContainer}>
            <SmileIcon />
            <View style={S.textContainer}>
              <Text style={S.title}>{t("thirdBenefitTitle")}</Text>
              <Text style={S.description}>{t("thirdBenefitDescription")}</Text>
            </View>
          </View>
        </View>
      </View>
      <Image
        source={PinkCircle}
        resizeMode="stretch"
        style={S.circle}
        accessibilityIgnoresInvertColors
      />
      <DepoimentsSection />
    </View>
  );
}

export default BenefitsSection;
