import { useWindowDimensions, View, Text, ScrollView, SafeAreaView } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { theme } from "@ribon.io/shared/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import TicketDonationsTabView from "../TicketDonationsTabView";
import CommunityDonationsTabView from "../CommunityDonationsTabView";
import DirectDonationsTabView from "../DirectDonationsTabView";
import ImpactCardsTabView from "../ImpactCardsTabView";
import S from "./styles";
import ProfileSection from "../ProfileSection";
import AccordionList from "components/moleculars/AccordionList";

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
      <View>
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
      <AccordionList
        header={<ProfileSection />}
        title="Por projeto"
        impactList={[
          {
            title: "Item 1",
            subtitle: "Subtitle 1",
            iconUrl: "https://picsum.photos/200",
            description: "This is the description for item 1.",
          },
          {
            title: "Item 2",
            subtitle: "Subtitle 2",
            iconUrl: "https://picsum.photos/200",
            description: "This is the description for item 2.",
          },
          {
            title: "Item 3",
            subtitle: "Subtitle 3",
            iconUrl: "https://picsum.photos/200",
            description: "", // No description for this item
          },
          {
            title: "Item 4",
            subtitle: "Subtitle 4",
            iconUrl: "https://picsum.photos/200",
            description: "This is the description for item 4.",
          },
        ]}
      />
    </View>
  );
}

export default TabViewSection;
