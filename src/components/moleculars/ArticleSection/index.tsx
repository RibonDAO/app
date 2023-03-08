import { Text, TouchableOpacity, View } from "react-native";
import { Article } from "@ribon.io/shared";
import Image from "components/atomics/Image";
import VendorIcon from "./assets/VendorIcon";
import NewsPaper from "./assets/NewsPaper";
import ArrowLeft from "./assets/ArrowLeft";
import { openInWebViewer } from "lib/linkOpener";
import styles from "./styles";

const VENDOR = "Ribon";

const PROTOCOL_REGEX = /^(http|https):\/\//;

export type Props = {
  article: Article;
  readMoreText: string;
};

export default function ArticleSection({ article, readMoreText }: Props) {
  const hasLink = Boolean(article?.link);

  const renderIcon = () => {
    const { name } = article.author;

    return name === VENDOR ? <VendorIcon /> : <NewsPaper />;
  };

  const renderAuthorName = () => {
    const { name } = article.author;
    const style = name === VENDOR ? styles.greenText : styles.orangeText;

    return <Text style={style}>{name}</Text>;
  };

  const handlePress = () => {
    let link = article?.link;

    if (link) {
      if (!PROTOCOL_REGEX.test(link)) link = `https://${link}`;
      return openInWebViewer(link);
    }
  };

  const renderContentFooter = () => {
    return (
      <View style={styles.imageFooter}>
        <Text style={styles.imageFooterText}>{readMoreText}</Text>
        <ArrowLeft />
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.header}>
          {renderIcon()}
          {renderAuthorName()}
          <Text style={styles.textDivider}>·</Text>
          <Text style={styles.textSecondary}>{article.publishedAtInWords}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>

        <View style={styles.imageContainer}>
          <Image
            style={{ ...styles.image, ...(!hasLink && styles.singleImage) }}
            source={{ uri: article.imageUrl }}
          />
          {hasLink && renderContentFooter()}
        </View>
      </TouchableOpacity>
    </View>
  );
}
