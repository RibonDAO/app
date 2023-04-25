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
import DonationDoneScreen from "screens/donations/DonationDoneStack/DonationDoneScreen";
import ChooseCauseScreen from "screens/donations/DonationDoneStack/ChooseCauseScreen";
import AvailableArticleScreen from "screens/donations/DonationDoneStack/AvailableArticleScreen";
import LoadingOverlayProvider from "contexts/loadingOverlayContext";
import CommunityAddScreen from "screens/promoters/SupportCauseScreen/CommunityAddScreen";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import PaymentScreen from "screens/promoters/PaymentScreen";
import { Theme } from "@react-navigation/native/src/types";
import { useTranslation } from "react-i18next";
import ContributionDoneScreen from "screens/promoters/ContributionDoneScreen";
import PromotersScreen from "screens/promoters/PromotersScreen";
import TicketsProvider from "contexts/ticketsContext";
import OnboardingScreen from "screens/onboarding/OnboardingScreen";
import ForYouScreen from "screens/content/ForYouScreen";
import { useCanDonate } from "@ribon.io/shared";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import S from "./styles";
import LinkingConfiguration from "./LinkingConfiguration";
import GivingIconOff from "./assets/GivingIconOff";
import GivingIconOn from "./assets/GivingIconOn";
import ImpactIconOn from "./assets/ImpactIconOn";
import ImpactIconOff from "./assets/ImpactIconOff";
import CausesIconOff from "./assets/CausesIconOff";
import CausesIconOn from "./assets/CausesIconOn";
import ForYouIconOn from "./assets/ForYouIconOn";
import ForYouIconOff from "./assets/ForYouIconOff";

const header = () => <Header rightComponent={<LayoutHeader />} />;
const headerWithoutTicket = () => (
  <Header rightComponent={<LayoutHeader hideTicket />} />
);
const headerWithWallet = () => (
  <Header rightComponent={<LayoutHeader hideTicket hideWallet={false} />} />
);
const { primary } = theme.colors.brand;
const { neutral } = theme.colors;

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
        name="ChooseCauseScreen"
        component={ChooseCauseScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="AvailableArticleScreen"
        component={AvailableArticleScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="ContributionDoneScreen"
        component={ContributionDoneScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerTintColor: theme.colors.brand.secondary[700],
          headerTitle: "",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: theme.colors.neutral10 },
        }}
      />

      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DonateScreen"
        component={DonateScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
          headerBackTitleVisible: true,
          headerBackTitle: "",
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
  const activeColor = neutral[900];
  const { t } = useTranslation();

  const { currentUser } = useCurrentUser();

  const { canDonate, refetch: refetchCanDonate } =
    useCanDonate(RIBON_INTEGRATION_ID);

  React.useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  return (
    <BottomTab.Navigator
      initialRouteName="CausesScreen"
      screenOptions={{
        tabBarActiveTintColor: neutral[900],
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
        name="ForYouScreen"
        component={ForYouScreen}
        options={{
          title: t("tabs.foryou") || "For you",
          tabBarIcon: ({ color }) =>
            color === activeColor ? <ForYouIconOn /> : <ForYouIconOff />,
          lazy: false,
          header: () => (canDonate ? <></> : headerWithoutTicket()),
        }}
      />

      <BottomTab.Screen
        name="PromotersScreen"
        component={PromotersScreen}
        options={{
          title: t("tabs.giving") || "Donations",
          tabBarIcon: ({ color }: any) =>
            color === activeColor ? <GivingIconOn /> : <GivingIconOff />,
          header: headerWithWallet,
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
    primary: primary[200],
    background: theme.colors.neutral10,
    card: theme.colors.neutral10,
    text: theme.colors.neutral[800],
    border: theme.colors.neutral10,
    notification: primary[300],
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
                  <TicketsProvider>
                    <RootNavigator />
                  </TicketsProvider>
                </CausesProvider>
              </CardPaymentInformationProvider>
            </CryptoPaymentProvider>
          </NetworkProvider>
        </WalletProvider>
      </LoadingOverlayProvider>
    </NavigationContainer>
  );
}
