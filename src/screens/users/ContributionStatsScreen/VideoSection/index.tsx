import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { WebView } from "react-native-webview";
import S from "./styles";

function VideoSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionStatsPage.video",
  });
  return (
    <View style={S.container}>
      <Text>
        <Text style={S.text}>{t("title.part1")} </Text>
        <Text style={{ ...S.boldText }}>{t("title.part2")}</Text>
      </Text>
      <WebView
        containerStyle={S.embeddedVideo}
        style={{}}
        javaScriptEnabled
        source={{
          uri: "https://www.youtube.com/embed/tJ9lY9npcNU?rel=0&autoplay=0&showinfo=0&controls=0",
        }}
      />
    </View>
  );
}

export default VideoSection;
