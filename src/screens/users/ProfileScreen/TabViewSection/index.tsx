import { useWindowDimensions, View, Text } from "react-native";
import TicketDonationsTabView from "../TicketDonationsTabView";
import CommunityDonationsTabView from "../CommunityDonationsTabView";
import DirectDonationsTabView from "../DirectDonationsTabView";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { theme } from "@ribon.io/shared";
import S from "./styles";
import { useState } from "react";

const renderScene = SceneMap({
  TicketDonationsTabView: TicketDonationsTabView,
  CommunityDonationsTabView: CommunityDonationsTabView,
  DirectDonationsTabView: DirectDonationsTabView,
});

const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      renderLabel={({ focused, route }) => {
        return (
          <Text style={{ ...S.tabBarTitle, color: focused ? theme.colors.green40 : theme.colors.gray30 }}>
            {route.title}
          </Text>
        );
      }}
      indicatorStyle={S.indicatorStyle}
      style={S.tabBar}
    />
  );
};

function TabViewSection(): JSX.Element {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'TicketDonationsTabView', title: 'Doações em Ticket' },
    { key: 'CommunityDonationsTabView', title: 'Doações em Comunidade' },
    { key: 'DirectDonationsTabView', title: 'Doações diretas' },
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
