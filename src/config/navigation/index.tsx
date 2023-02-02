import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
} from "@react-navigation/native";
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
import SupportCauseScreen from "screens/promoters/SupportCauseScreen";
import LoadingOverlayProvider from "contexts/loadingOverlayContext";
import CommunityAddScreen from "screens/promoters/SupportCauseScreen/CommunityAddScreen";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import PaymentScreen from "screens/promoters/PaymentScreen";
import S from "./styles";
import LinkingConfiguration from "./LinkingConfiguration";
import GivingIconOff from "./assets/GivingIconOff";
import GivingIconOn from "./assets/GivingIconOn";
import ProfileIconOff from "./assets/ProfileIconOff";
import ProfileIconOn from "./assets/ProfileIconOn";
import CausesIconOff from "./assets/CausesIconOff";
import CausesIconOn from "./assets/CausesIconOn";
import {Theme} from "@react-navigation/native/src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const header = () => <Header rightComponent={<LayoutHeader />} />;
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
          header,
          lazy: false,
        }}
      />

      <BottomTab.Screen
        name="PromotersScreen"
        component={SupportCauseScreen}
        options={{
          title: "Giving",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <GivingIconOn /> : <GivingIconOff />,
          header,
          lazy: false,
        }}
      />

      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <ProfileIconOn /> : <ProfileIconOff />,
          headerShown: false,
          header,
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
        notification: theme.colors.green30,
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
