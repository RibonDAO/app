import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import * as React from "react";
import TicketDonationsTabView from "../TicketDonationsTabView";
import CommunityDonationsTabView from "../CommunityDonationsTabView";
import DirectDonationsTabView from "../DirectDonationsTabView";
import ImpactCardsTabView from "../ImpactCardsTabView";
import S from "./styles";
import ProfileSection from "../ProfileSection";

type Route = {
  key: string;
  title: string;
};

const renderScene = SceneMap({
  ImpactCardsTabView,
  TicketDonationsTabView,
  CommunityDonationsTabView,
  DirectDonationsTabView,
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
    keyPrefix: "users.impactScreen",
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "ImpactCardsTabView", title: t("ImpactCardsTitle") },
    { key: "TicketDonationsTabView", title: t("ticketDonationsTitle") },
    { key: "CommunityDonationsTabView", title: t("communityDonationsTitle") },
    { key: "DirectDonationsTabView", title: t("directDonationsTitle") },
  ]);

  return (
    <View style={S.tabViewSection}>
      <CollapsibleTabView<Route>
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderHeader={() => <ProfileSection />}
        disableSnap
        tabBarProps={{
          scrollEnabled: true,
        }}
        style={{ backgroundColor: theme.colors.neutral10 }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export default TabViewSection;
