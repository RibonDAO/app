import { View, Text, Image } from "react-native";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import S from "./styles";
import DepoimentIcon from "./assets/Depoiment.png";
import DepoimentIcon2 from "./assets/Depoiment2.png";
import DepoimentIcon3 from "./assets/Depoiment3.png";

function DepoimentsSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.depoimentsSection",
  });
  return (
    <View style={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <ScrollView
        horizontal
        style={S.innerContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View style={S.card}>
          <View style={S.cardContainer}>
            <Image
              source={DepoimentIcon}
              accessibilityIgnoresInvertColors
              style={{ borderRadius: 50, width: 40, height: 40 }}
            />
            <View style={S.textContainer}>
              <Text style={S.titleCard}>{t("firstDepoimentTitle")}</Text>
              <Text style={S.descriptionCard}>
                {t("firstDepoimentDescription")}
              </Text>
            </View>
          </View>
        </View>
        <View style={S.card}>
          <View style={S.cardContainer}>
            <Image
              source={DepoimentIcon2}
              accessibilityIgnoresInvertColors
              style={{ borderRadius: 50, width: 40, height: 40 }}
            />
            <View style={S.textContainer}>
              <Text style={S.titleCard}>{t("secondDepoimentTitle")}</Text>
              <Text style={S.descriptionCard}>
                {t("secondDepoimentDescription")}
              </Text>
            </View>
          </View>
        </View>
        <View style={S.card}>
          <View style={S.cardContainer}>
            <Image
              source={DepoimentIcon3}
              accessibilityIgnoresInvertColors
              style={{ borderRadius: 50, width: 40, height: 40 }}
            />
            <View style={S.textContainer}>
              <Text style={S.titleCard}>{t("thirdDepoimentTitle")}</Text>
              <Text style={S.descriptionCard}>
                {t("thirdDepoimentDescription")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DepoimentsSection;
