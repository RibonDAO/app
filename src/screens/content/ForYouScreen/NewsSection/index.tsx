import { Text, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { Article, useArticles } from "@ribon.io/shared";
import ArticleSection from "components/moleculars/ArticleSection";
import ForYouScreenPlaceholder from "./placeholder";
import { RibonOnboarding } from "utils/constants/Articles";
import { useTranslation } from "react-i18next";
import styles from "./styles";

export default function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.newsSection",
  });

  const [articles, setArticles] = useState<Article[]>([]);

  const { getArticles } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getArticles();
      setArticles(articles);
    };

    fetchArticles();
  }, []);

  const renderOnboarding = () => {
    const article = RibonOnboarding(t);

    return (
      <View>
        <View style={styles.paddingContainer}>
          <ArticleSection article={article} />
        </View>
        <View style={styles.articleDivider} />
      </View>
    );
  };

  return !articles ? (
    <ForYouScreenPlaceholder />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.paddingContainer}>
        <Text style={styles.title}>{t("title")}</Text>
      </View>
      <View style={styles.articlesContainer}>
        {renderOnboarding()}
        {articles &&
          articles.map((article, index) => (
            <>
              <View style={styles.paddingContainer}>
                <ArticleSection article={article} />
              </View>
              {index !== articles.length - 1 && (
                <View style={styles.articleDivider} />
              )}
            </>
          ))}
      </View>
    </ScrollView>
  );
}
