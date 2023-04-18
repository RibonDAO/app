import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import React, { useEffect } from "react";
import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import { useCanDonate } from "@ribon.io/shared";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import TasksSection from "../TasksSection";
import LockedSection from "../LockedSection";
import NewsSection from "../NewsSection";
import S from "./styles";
import { useTasksContext } from "contexts/tasksContext";

type Route = {
  key: string;
  title: string;
};

function NewsSectionTabView(): JSX.Element {
  const { canDonate } = useCanDonate(RIBON_INTEGRATION_ID);
  return (
    <ParallaxTabViewContainer routeKey="NewsSectionTabView">
      {canDonate ? <LockedSection /> : <NewsSection />}
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
  const { canDonate } = useCanDonate(RIBON_INTEGRATION_ID);
  const { registerAction } = useTasksContext();

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

  useEffect(() => {
    if (index === 1 && !canDonate) {
      registerAction("for_you_news_tab_view");
    }
  }, [index]);

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
