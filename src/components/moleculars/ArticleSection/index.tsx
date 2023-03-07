import { Text, TouchableOpacity, View } from "react-native";
import { Article } from "@ribon.io/shared";
import Image from "components/atomics/Image";
import VendorIcon from "./assets/VendorIcon";
import NewsPaper from "./assets/NewsPaper";
import { openInWebViewer } from "lib/linkOpener";
import styles from "./styles";

const VENDOR = "Ribon";

const PROTOCOL_REGEX = /^(http|https):\/\//;

export type Props = {
  article: Article;
};

export default function ArticleSection({ article }: Props) {
  const renderAuthor = () => {
    if (article.author.name === VENDOR) {
      return (
        <>
          <VendorIcon />
          <Text style={styles.greenText}>{VENDOR}</Text>
        </>
      );
    }

    return (
      <>
        <NewsPaper />
        <Text style={styles.orangeText}>{article.author.name}</Text>
      </>
    );
  };

  const handlePress = () => {
    let link = article.link;
    if (!link.match(PROTOCOL_REGEX)) link = `https://${link}`;

    return openInWebViewer(link);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.header}>
          {renderAuthor()}
          <Text style={styles.textDivider}>·</Text>
          <Text style={styles.textSecondary}>{article.publishedAtInWords}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <Image style={styles.image} source={{ uri: article.imageUrl }} />
      </TouchableOpacity>
    </View>
  );
}
