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
        style={{ opacity: 0.99 }} // opacity is set to 0.99 to avoid a bug in the WebView component
        javaScriptEnabled
        source={{
          uri: "https://www.youtube.com/embed/tJ9lY9npcNU?rel=0&autoplay=0&showinfo=0&controls=0",
        }}
      />
    </View>
  );
}

export default VideoSection;
