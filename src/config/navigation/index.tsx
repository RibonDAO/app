import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import WalletProvider from "contexts/walletContext";
import NetworkProvider from "contexts/networkContext";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import CausesProvider from "contexts/causesContext";
import DonateScreen from "screens/donations/DonateScreen";
import NotFoundScreen from "screens/NotFoundScreen";
import CausesScreen from "screens/donations/CausesScreen";
import ProfileScreen from "screens/users/ProfileScreen";
import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import { RootStackParamList, RootTabParamList } from "types";
import { theme } from "@ribon.io/shared/styles";
import Header from "components/moleculars/Header";
import LayoutHeader from "components/moleculars/LayoutHeader";
import DonationDoneScreen from "screens/donations/DonationDoneScreen";
import LoadingOverlayProvider from "contexts/loadingOverlayContext";
import CommunityAddScreen from "screens/promoters/SupportCauseScreen/CommunityAddScreen";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import PaymentScreen from "screens/promoters/PaymentScreen";
import { Theme } from "@react-navigation/native/src/types";
import { useTranslation } from "react-i18next";
import ContributionDoneScreen from "screens/promoters/ContributionDoneScreen";
import PromotersScreen from "screens/promoters/PromotersScreen";
import S from "./styles";
import LinkingConfiguration from "./LinkingConfiguration";
import GivingIconOff from "./assets/GivingIconOff";
import GivingIconOn from "./assets/GivingIconOn";
import ImpactIconOn from "./assets/ImpactIconOn";
import ImpactIconOff from "./assets/ImpactIconOff";
import CausesIconOff from "./assets/CausesIconOff";
import CausesIconOn from "./assets/CausesIconOn";

const header = () => <Header rightComponent={<LayoutHeader />} />;
const headerWithoutTicket = () => (
  <Header rightComponent={<LayoutHeader hideTicket />} />
);

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="ReceiveTicketScreen"
        component={ReceiveTicketScreen}
        options={{
          title: "ReceiveTicketScreen",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DonationDoneScreen"
        component={DonationDoneScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="ContributionDoneScreen"
        component={ContributionDoneScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="CausesScreen"
        component={CausesScreen}
        options={{
          title: "Causes",
          header,
        }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerTintColor: theme.colors.orange40,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: theme.colors.neutral10 },
        }}
      />

      <Stack.Screen
        name="DonateScreen"
        component={DonateScreen}
        options={{
          headerShown: false,
          headerTintColor: theme.colors.orange40,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="CommunityAddModal"
          component={CommunityAddScreen}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const activeColor = theme.colors.brand.primary[300];
  const { t } = useTranslation();

  return (
    <BottomTab.Navigator
      initialRouteName="CausesScreen"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.brand.primary[300],
        tabBarStyle: { ...S.tabBar },
        tabBarLabelStyle: { ...S.tabBarLabel },
      }}
    >
      <BottomTab.Screen
        name="CausesScreen"
        component={CausesScreen}
        options={{
          title: t("tabs.causes") || "Tickets",
          tabBarIcon: ({ color }) =>
            color === activeColor ? <CausesIconOn /> : <CausesIconOff />,
          header,
          lazy: false,
        }}
      />

      <BottomTab.Screen
        name="PromotersScreen"
        component={PromotersScreen}
        options={{
          title: t("tabs.giving") || "Donations",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <GivingIconOn /> : <GivingIconOff />,
          header: headerWithoutTicket,
          lazy: false,
        }}
      />

      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: t("tabs.profile") || "Impact",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <ImpactIconOn /> : <ImpactIconOff />,
          header: headerWithoutTicket,
          lazy: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: theme.colors.green20,
    background: theme.colors.neutral10,
    card: theme.colors.neutral10,
    text: theme.colors.gray40,
    border: theme.colors.neutral10,
    notification: theme.colors.brand.primary[300],
  },
};

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <LoadingOverlayProvider>
        <WalletProvider>
          <NetworkProvider>
            <CryptoPaymentProvider>
              <CardPaymentInformationProvider>
                <CausesProvider>
                  <RootNavigator />
                </CausesProvider>
              </CardPaymentInformationProvider>
            </CryptoPaymentProvider>
          </NetworkProvider>
        </WalletProvider>
      </LoadingOverlayProvider>
    </NavigationContainer>
  );
}
