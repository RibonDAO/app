import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import WalletProvider from "contexts/walletContext";
import NetworkProvider from "contexts/networkContext";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import CausesProvider from "contexts/causesContext";
import CurrentUserProvider from "contexts/currentUserContext";
import CausesIconOn from "./assets/CausesIconOn";
import CausesIconOff from "./assets/CausesIconOff";
import ProfileIconOn from "./assets/ProfileIconOn";
import ProfileIconOff from "./assets/ProfileIconOff";
import GivingIconOn from "./assets/GivingIconOn";
import GivingIconOff from "./assets/GivingIconOff";
import DonateModal from "screens/donations/DonateModal";
import NotFoundScreen from "screens/NotFoundScreen";
import CausesScreen from "screens/donations/CausesScreen";
import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import ProfileScreen from "screens/ProfileScreen";
import { RootStackParamList, RootTabParamList } from "types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "@ribon.io/shared/styles";
import Header from "components/moleculars/Header";
import LayoutHeader from "components/moleculars/LayoutHeader";
import DonationDoneScreen from "screens/donations/DonationDoneScreen";
import SupportCauseScreen from "screens/promoters/SupportCauseScreen";
import S from "./styles";
import ChooseCauseScreen from "screens/donations/ChooseCauseScreen";

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

      <BottomTab.Screen
        name="ChooseCauseScreen"
        component={ChooseCauseScreen}
        options={{
          title: "ChooseCausesScreen",
          header: () => <Header rightComponent={<LayoutHeader />} />,
        }}
      />

      <Stack.Screen
        name="CausesScreen"
        component={CausesScreen}
        options={{
          title: "Causes",
          header: () => <Header rightComponent={<LayoutHeader />} />,
        }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="DonateModal" component={DonateModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const activeColor = theme.colors.green30;

  return (
    <BottomTab.Navigator
      initialRouteName="CausesScreen"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green30,
        tabBarStyle: { ...S.tabBar },
        tabBarLabelStyle: { ...S.tabBarLabel },
      }}
    >
      <BottomTab.Screen
        name="CausesScreen"
        component={CausesScreen}
        options={{
          title: "Causes",
          tabBarIcon: ({ color }) =>
            color === activeColor ? <CausesIconOn /> : <CausesIconOff />,
          header: () => <Header rightComponent={<LayoutHeader />} />,
        }}
      />

      <BottomTab.Screen
        name="PromotersScreen"
        component={SupportCauseScreen}
        options={{
          title: "Giving",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <GivingIconOn /> : <GivingIconOff />,
          header: () => <Header rightComponent={<LayoutHeader />} />,
        }}
      />

      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <ProfileIconOn /> : <ProfileIconOff />,
          header: () => <Header rightComponent={<LayoutHeader />} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <CurrentUserProvider>
        <WalletProvider>
          <NetworkProvider>
            <CryptoPaymentProvider>
              <CausesProvider>
                <RootNavigator />
              </CausesProvider>
            </CryptoPaymentProvider>
          </NetworkProvider>
        </WalletProvider>
      </CurrentUserProvider>
    </NavigationContainer>
  );
}
