import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Image from "components/atomics/Image";
import { theme, useArticles } from "@ribon.io/shared";
import ImageWithInfoLayout from "components/moleculars/layouts/ImageWithInfoLayout";
import { useTranslation } from "react-i18next";
import { useUnsafeAreaContext } from "contexts/unsafeAreaContext";
import { defaultBodyMdSemibold } from "styles/typography/default";
import { logEvent } from "services/analytics";
import usePageView from "hooks/usePageView";
import NewsPlaceholder from "./placeholder";
import S from "./styles";

export default function AvailableArticleScreen() {
  usePageView("P19_view");
  const { navigateTo } = useNavigation();
  const { getArticles } = useArticles();
  const [article, setArticle] = React.useState<any>();
  const { setBottomBackgroundColor } = useUnsafeAreaContext();

  const { t } = useTranslation("translation", {
    keyPrefix: "content.availableArticleScreen",
  });

  const { primary } = theme.colors.brand;

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getArticles();
      setArticle(fetchedArticles[0]);
    };

    fetchArticles();
  }, []);

  const navigateToNewsTab = () => {
    logEvent("checkpostCard_Click");
    navigateTo("EarnTicketsScreen", { currentTab: 1 });
  };

  const navigateToTasksTab = () => {
    navigateTo("EarnTicketsScreen", { currentTab: 0 });
  };

  useEffect(() => {
    logEvent("P19_view");
  }, []);

  useEffect(() => {
    setBottomBackgroundColor(primary[50]);

    return () => {
      setBottomBackgroundColor("white");
    };
  }, []);

  return (
    <View style={S.container}>
      <View style={S.topRow}>
        <ImageWithInfoLayout
          title={t("title") || ""}
          description={t("subtitle") || ""}
          imageHeight={128}
        />
      </View>

      <View style={S.bottomRow}>
        {!article ? (
          <NewsPlaceholder />
        ) : (
          <View style={S.articleContainer}>
            <View style={S.imageContainer}>
              <Image
                style={S.articleImage}
                source={{ uri: article.imageUrl }}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
            <View style={S.articleContent}>
              <Text style={S.textSecondary}>{article.publishedAtInWords}</Text>
              <Text style={S.textPrimary}>{article.author.name}</Text>
              <Text style={S.textMedium} ellipsizeMode="tail" numberOfLines={3}>
                {article.title}
              </Text>
            </View>
          </View>
        )}
        <Button
          text={t("seeAllPosts")}
          customStyles={S.buttonPrimary}
          customTextStyles={{
            color: theme.colors.neutral10,
            ...defaultBodyMdSemibold,
          }}
          onPress={navigateToNewsTab}
          backgroundColor={primary[100]}
        />
        <Button
          customStyles={S.buttonSecondary}
          customTextStyles={{
            color: primary[600],
            ...defaultBodyMdSemibold,
          }}
          text={t("continue")}
          onPress={navigateToTasksTab}
          outline
        />
      </View>
    </View>
  );
}
