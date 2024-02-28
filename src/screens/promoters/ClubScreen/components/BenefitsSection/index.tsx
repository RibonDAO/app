import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import S from "./styles";
import TicketIcon from "./assets/TicketIcon";
import BoxIcon from "./assets/BoxIcon";
import SmileIcon from "./assets/SmileIcon";
import DepoimentsSection from "../DepoimentsSection";

function BenefitsSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.benefitsSection",
  });

  return (
    <>
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
      <DepoimentsSection />
    </>
  );
}

export default BenefitsSection;
