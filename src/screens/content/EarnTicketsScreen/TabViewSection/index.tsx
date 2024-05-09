import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import React, { useEffect } from "react";
import ParallaxTabViewContainer from "components/moleculars/ParallaxTabViewContainer";
import { useDonatedToday } from "@ribon.io/shared";
import { logEvent } from "services/analytics";
import { useFocusEffect } from "@react-navigation/native";

import LockedSection from "../LockedSection";
import NewsSection from "../NewsSection";
import S from "./styles";
import TicketsSection from "../TicketsSection";

type Route = {
  key: string;
  title: string;
};

function NewsSectionTabView(): JSX.Element {
  const { donatedToday } = useDonatedToday();
  return (
    <ParallaxTabViewContainer routeKey="NewsSectionTabView">
      {!donatedToday ? <LockedSection /> : <NewsSection />}
    </ParallaxTabViewContainer>
  );
}

function TicketsSectionTabView(): JSX.Element {
  return (
    <ParallaxTabViewContainer routeKey="TicketsSectionTabView">
      <TicketsSection />
    </ParallaxTabViewContainer>
  );
}

const renderScene = SceneMap({
  TicketsSectionTabView,
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
  const { donatedToday } = useDonatedToday();

  const [index, setIndex] = useState(0);

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
        index === 0 ? "P21_view" : !donatedToday ? "P16_view" : "P20_view";
      logEvent(eventName);
    }, [index]),
  );

  const [routes] = useState([
    { key: "TicketsSectionTabView", title: t("ticketsSectionTitle") },
    { key: "NewsSectionTabView", title: t("newsSectionTitle") },
  ]);

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
        style={{
          backgroundColor: theme.colors.neutral10,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export default TabViewSection;
