import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import S from "./styles";
import DepoimentIcon from "./assets/DepoimentIcon.png";

function DepoimentsSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.depoimentsSection",
  });
  return (
    <View style={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <ScrollView horizontal style={S.innerContainer}>
        <View style={S.card}>
          <View style={S.cardContainer}>
            <Image source={DepoimentIcon} accessibilityIgnoresInvertColors />
            <View style={S.textContainer}>
              <Text style={S.titleCard}>{t("firstDepoimentTitle")}</Text>
              <Text style={S.descriptionCard}>
                {t("firstDepoimentDescription")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DepoimentsSection;
