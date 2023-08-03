import { useWindowDimensions, View, Text } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import * as React from "react";
import ImpactCards from "screens/users/ImpactScreen/ImpactCards";
import useContributionActivity from "hooks/useContributionActivity";
import TicketDonationsTabView from "../TicketDonationsTabView";
import CommunityDonationsTabView from "../CommunityDonationsTabView";
import DirectDonationsTabView from "../DirectDonationsTabView";
import S from "./styles";

type Route = {
  key: string;
  title: string;
  showActivityIndicator?: boolean;
};

const renderScene = SceneMap({
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
    renderIcon={({ route }: any) =>
      route.showActivityIndicator ? <View style={S.redBall} /> : null
    }
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
  const { newContributionActivity } = useContributionActivity();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const routes = useCallback(
    () => [
      {
        key: "TicketDonationsTabView",
        title: t("ticketDonationsTitle"),
        showActivityIndicator: false,
      },
      {
        key: "CommunityDonationsTabView",
        title: t("communityDonationsTitle"),
        showActivityIndicator: newContributionActivity,
      },
      {
        key: "DirectDonationsTabView",
        title: t("directDonationsTitle"),
        showActivityIndicator: false,
      },
    ],
    [newContributionActivity],
  );

  return (
    <View style={S.tabViewSection}>
      <CollapsibleTabView<Route>
        navigationState={{ index, routes: routes() }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderHeader={() => <ImpactCards />}
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
