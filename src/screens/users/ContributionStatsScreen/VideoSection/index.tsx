import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { WebView } from "react-native-webview";
import { useLanguage } from "contexts/languageContext";
import { Languages } from "@ribon.io/shared/types";
import S from "./styles";

function VideoSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.video",
  });
  const { currentLang } = useLanguage();
  const ptEmbedId = "tJ9lY9npcNU";
  const enEmbedId = "7hgatm9cq40";
  const embedId = currentLang === Languages.PT ? ptEmbedId : enEmbedId;

  return (
    <View style={S.container}>
      <Text>
        <Text style={S.text}>{t("title.part1")} </Text>
        <Text style={{ ...S.boldText }}>{t("title.part2")}</Text>
      </Text>
      <WebView
        containerStyle={S.embeddedVideo}
        style={{ opacity: 0.99 }} // opacity is set to 0.99 to avoid a bug in the WebView component
        javaScriptEnabled
        source={{
          uri: `https://www.youtube.com/embed/${embedId}?rel=0&autoplay=0&showinfo=0&controls=0`,
        }}
      />
    </View>
  );
}

export default VideoSection;
