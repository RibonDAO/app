import { View } from "react-native";
import { useEffect, useState } from "react";
import { Article, useArticles } from "@ribon.io/shared";
import ArticleLayout from "components/moleculars/layouts/ArticleLayout";
import { RibonOnboarding } from "utils/constants/Articles";
import { useTranslation } from "react-i18next";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useCurrentUser } from "contexts/currentUserContext";
import { logEvent } from "services/analytics";
import styles from "./styles";
import EarnTicketsScreenPlaceholder from "./placeholder";

const IS_USER_ONBOARDING = "IS_USER_ONBOARDING";

export default function NewsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.newsSection",
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const { currentUser } = useCurrentUser();

  const { getUserArticles } = useArticles();

  useEffect(() => {
    const fetchArticles = async () => {
      const currentArticles = await getUserArticles();
      setArticles(currentArticles);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchFirstTimeSeeingOnboarding = async () => {
      const firstTimeSeeingOnboarding = await getLocalStorageItem(
        `${IS_USER_ONBOARDING}_${currentUser?.id}`,
      );

      if (
        firstTimeSeeingOnboarding === null ||
        Number(firstTimeSeeingOnboarding) < 3
      ) {
        await setLocalStorageItem(
          `${IS_USER_ONBOARDING}_${currentUser?.id}`,
          String(Number(firstTimeSeeingOnboarding) + 1),
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

    logEvent("P20_onboardingPost_view");

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
    <EarnTicketsScreenPlaceholder />
  ) : (
    <View style={styles.articlesContainer}>
      {isOnboarding && renderOnboarding()}
      {articles &&
        articles.map((article, index) => (
          <View key={article.id}>
            <View style={styles.paddingContainer}>
              <ArticleLayout
                article={article}
                readMoreText={t("openPostButtonText")}
              />
            </View>
            {index !== articles.length - 1 && (
              <View style={styles.articleDivider} />
            )}
          </View>
        ))}
    </View>
  );
}
