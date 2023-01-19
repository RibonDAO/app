import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import CausesIconOn from "./assets/CausesIconOn";
import CausesIconOff from "./assets/CausesIconOff";
import ProfileIconOn from "./assets/ProfileIconOn";
import ProfileIconOff from "./assets/ProfileIconOff";
import DonateModal from "screens/donations/DonateModal";
import NotFoundScreen from "screens/NotFoundScreen";
import CausesScreen from "screens/donations/CausesScreen";
import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import ProfileScreen from "screens/ProfileScreen";
import {
  RootStackParamList,
  RootTabParamList,
} from "types";
import LinkingConfiguration from "./LinkingConfiguration";
import { theme } from "@ribon.io/shared/styles";
import Header from "components/moleculars/Header";
import S from "./styles";
import CausesProvider from "contexts/causesContext";
import CurrentUserProvider from "contexts/currentUserContext";
import DonationDoneScreen from "screens/donations/DonationDoneScreen";
import LayoutHeader from "components/moleculars/LayoutHeader";
import ChooseCauseScreen from "screens/donations/ChooseCauseScreen";

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
        <CausesProvider>
          <RootNavigator />
        </CausesProvider>
      </CurrentUserProvider>
    </NavigationContainer>
  );
}

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
        name="DonationDoneScreen"
        component={DonationDoneScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="ChooseCauseScreen"
        component={ChooseCauseScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
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
      initialRouteName="ReceiveTicketScreen"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green30,
        tabBarStyle: { ...S.tabBar },
        tabBarLabelStyle: { ...S.tabBarLabel },
      }}
    >
      <BottomTab.Screen
        name="ReceiveTicketScreen"
        component={ReceiveTicketScreen}
        options={{
          title: "Tickets",
          headerShown: false,
          tabBarStyle: { display: "none" }
        }}
      />

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
