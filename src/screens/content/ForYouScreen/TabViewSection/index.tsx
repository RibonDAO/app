import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import React, { useEffect } from "react";
import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import { useCanDonate } from "@ribon.io/shared";
import { PLATFORM } from "utils/constants/Application";
import { useForYouTabsContext } from "contexts/forYouTabsContext";
import { useTasksContext } from "contexts/tasksContext";
import { TASKS } from "utils/constants/Tasks";
import { logEvent } from "services/analytics";
import { useFocusEffect } from "@react-navigation/native";
import { useIntegrationContext } from "contexts/integrationContext";
import TasksSection from "../TasksSection";
import LockedSection from "../LockedSection";
import NewsSection from "../NewsSection";
import S from "./styles";

type Route = {
  key: string;
  title: string;
};

function NewsSectionTabView(): JSX.Element {
  const { currentIntegrationId } = useIntegrationContext();
  const { canDonate } = useCanDonate(currentIntegrationId, PLATFORM);
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

export type TabViewSectionProps = {
  initialTabIndex?: number;
};

function TabViewSection({ initialTabIndex }: TabViewSectionProps): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content",
  });

  const layout = useWindowDimensions();
  const { currentIntegrationId } = useIntegrationContext();
  const { canDonate } = useCanDonate(currentIntegrationId, PLATFORM);
  const { registerAction, hasCompletedATask, tasksState } = useTasksContext();

  const { index, setIndex } = useForYouTabsContext();

  useEffect(() => {
    if (initialTabIndex) {
      setTimeout(() => {
        setIndex(initialTabIndex);
      }, 500);
    }
  }, [initialTabIndex]);

  useFocusEffect(
    useCallback(() => {
      const eventName =
        // eslint-disable-next-line no-nested-ternary
        index === 0 ? "P21_view" : canDonate ? "P16_view" : "P20_view";
      logEvent(eventName);
    }, [index]),
  );

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
    const taskDownloadApp = TASKS.filter(
      (task) => task.title === "check_daily_news",
    )[0];

    const done = tasksState?.find(
      (task) => task.id === taskDownloadApp.id,
    )?.done;
    if (index === 1 && !canDonate && !done) {
      registerAction("for_you_news_tab_view");
    }
  }, [index]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ focused, route }) => (
        <View>
          <Text
            style={{
              ...S.tabBarTitle,
              color: focused
                ? theme.colors.brand.primary[800]
                : theme.colors.neutral[500],
              top: 0,
            }}
          >
            {route.title}
            {hasCompletedATask && route.title === t("tasksSectionTitle") && (
              <View style={S.tabContainer}>
                <View style={S.redBall} />
              </View>
            )}
          </Text>
        </View>
      )}
      indicatorStyle={S.indicatorStyle}
      style={S.tabBar}
      tabStyle={S.tabStyle}
      scrollEnabled
    />
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
