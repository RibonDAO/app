import { Text, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { Article, useArticles } from "@ribon.io/shared";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import ForYouScreenPlaceholder from "./placeholder";
import { RibonOnboarding } from "utils/constants/Articles";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useCurrentUser } from "contexts/currentUserContext";
import styles from "./styles";

const IS_USER_ONBOARDING = "IS_USER_ONBOARDING";

export default function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.newsSection",
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const { currentUser } = useCurrentUser();

  const { getArticles } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getArticles();
      setArticles(articles);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchFirstTimeSeeingOnboarding = async () => {
      const firstTimeSeeingOnboarding = await getLocalStorageItem(
        `${IS_USER_ONBOARDING}_${currentUser?.id}`,
      );

      if (firstTimeSeeingOnboarding === null) {
        await setLocalStorageItem(
          `${IS_USER_ONBOARDING}_${currentUser?.id}`,
          "true",
        );
        setIsOnboarding(true);
      } else {
        setIsOnboarding(false);
      }
    };

    fetchFirstTimeSeeingOnboarding();
  }, []);

  const renderOnboarding = () => {
    const article = RibonOnboarding(t);

    return (
      <View>
        <View style={styles.paddingContainer}>
          <ArticleLayout
            article={article}
            readMoreText={t("openPostButtonText")}
          />
        </View>
        <View style={styles.articleDivider} />
      </View>
    );
  };

  return !articles ? (
    <ForYouScreenPlaceholder />
  ) : (
    <View style={styles.articlesContainer}>
      {isOnboarding && renderOnboarding()}
      {articles &&
        articles.map((article, index) => (
          <>
            <View style={styles.paddingContainer}>
              <ArticleLayout
                article={article}
                readMoreText={t("openPostButtonText")}
              />
            </View>
            {index !== articles.length - 1 && (
              <View style={styles.articleDivider} />
            )}
          </>
        ))}
    </View>
  );
}
