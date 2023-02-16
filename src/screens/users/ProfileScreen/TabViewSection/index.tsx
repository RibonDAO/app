import { useWindowDimensions, View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TicketDonationsTabView from "../TicketDonationsTabView";
import CommunityDonationsTabView from "../CommunityDonationsTabView";
import DirectDonationsTabView from "../DirectDonationsTabView";
import S from "./styles";

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
    indicatorStyle={S.indicatorStyle}
    style={S.tabBar}
    tabStyle={S.tabStyle}
    scrollEnabled
  />
);

function TabViewSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TicketDonationsTabView", title: t("ticketDonationsTitle") },
    { key: "CommunityDonationsTabView", title: t("communityDonationsTitle") },
    { key: "DirectDonationsTabView", title: t("directDonationsTitle") },
  ]);

  return (
    <View style={S.tabViewSection}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: theme.colors.neutral10 }}
      />
    </View>
  );
}

export default TabViewSection;
