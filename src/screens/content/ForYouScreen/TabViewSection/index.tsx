import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import * as React from "react";
import NewsSection from "../NewsSection";
import TasksSection from "../TasksSection";
import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import S from "./styles";

type Route = {
  key: string;
  title: string;
};

function NewsSectionTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="NewsSectionTabView">
      <NewsSection />
    </ParallaxTabViewContainer>
  );
}

function TasksSectionTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="TasksSectionTabView">
      <TasksSection />
    </ParallaxTabViewContainer>
  );
}

const renderScene = SceneMap({
  TasksSectionTabView,
  NewsSectionTabView,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    renderLabel={({ focused, route }) => (
      <View style={{ width: 2000 }}>
        <Text
          style={{
            ...S.tabBarTitle,
            color: focused
              ? theme.colors.brand.primary[800]
              : theme.colors.neutral[500],
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
    indicatorStyle={S.indicatorStyle}
    style={S.tabBar}
    tabStyle={S.tabStyle}
    scrollEnabled
  />
);

function TabViewSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content",
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TasksSectionTabView", title: t("tasksSectionTitle") },
    { key: "NewsSectionTabView", title: t("newsSectionTitle") },
  ]);

  const header = () => (
    <View style={S.paddingContainer}>
      <Text style={S.title}>{t("forYouScreen.newsSection.title")}</Text>
    </View>
  );

  return (
    <View style={S.tabViewSection}>
      <CollapsibleTabView<Route>
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderHeader={header}
        style={{ backgroundColor: theme.colors.neutral10 }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export default TabViewSection;