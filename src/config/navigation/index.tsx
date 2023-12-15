import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import WalletProvider from "contexts/walletContext";
import NetworkProvider from "contexts/networkContext";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import CausesProvider from "contexts/causesContext";
import CauseContributionProvider from "contexts/causesContributionContext";
import CauseDonationProvider from "contexts/causesDonationContext";
import NotFoundScreen from "screens/NotFoundScreen";
import CausesScreen from "screens/donations/CausesScreen";
import ImpactScreen from "screens/users/ImpactScreen";
import ReceiveTicketScreen from "screens/donations/ReceiveTicketScreen";
import {
  PrivateStackParamList,
  RootStackParamList,
  RootTabParamList,
} from "types";
import { theme } from "@ribon.io/shared/styles";
import Header from "components/moleculars/Header";
import LayoutHeader from "components/moleculars/LayoutHeader";
import DonationDoneScreen from "screens/donations/DonationDoneStack/DonationDoneScreen";
import PostDonationScreen from "screens/donations/DonationDoneStack/PostDonationScreen";
import AvailableArticleScreen from "screens/donations/DonationDoneStack/AvailableArticleScreen";
import LoadingOverlayProvider from "contexts/loadingOverlayContext";
import CommunityAddScreen from "screens/promoters/SupportCauseScreen/CommunityAddScreen";
import CardPaymentInformationProvider from "contexts/cardPaymentInformationContext";
import PaymentScreen from "screens/promoters/PaymentScreen";
import CheckoutScreen from "screens/promoters/CheckoutScreen";
import { Theme } from "@react-navigation/native/src/types";
import { useTranslation } from "react-i18next";
import ContributionDoneScreen from "screens/promoters/ContributionDoneScreen";
import PromotersScreen from "screens/promoters/PromotersScreen";
import TicketsProvider from "contexts/ticketsContext";
import OnboardingScreen from "screens/onboarding/OnboardingScreen";
import ForYouScreen from "screens/content/ForYouScreen";
import { useCanDonate } from "@ribon.io/shared";
import Toast from "react-native-toast-message";
import { toastConfig } from "lib/Toast";
import { PLATFORM, RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import { useNavigation } from "hooks/useNavigation";
import GiveTicketScreen from "screens/donations/GiveTicketScreen";
import ContributionStatsScreen from "screens/users/ContributionStatsScreen";
import CheckoutProvider from "contexts/checkoutContext";
import NonProfitsProvider from "contexts/nonProfitsContext";
import IntegrationProvider, {
  useIntegrationContext,
} from "contexts/integrationContext";
import RecurrenceScreen from "screens/promoters/RecurrenceScreen";
import { Image } from "react-native";
import { openInWebViewer } from "lib/linkOpener";
import MonthlyContributionsScreen from "screens/promoters/MonthlyContributionsScreen";
import UtmProvider, { useUtmContext } from "contexts/utmContext";
import ZeroTicketScreen from "screens/donations/ZeroTicketScreen";
import { logEvent } from "services/analytics";
import PixInstructionsScreen from "screens/promoters/CheckoutScreen/PixInstructionsScreen";
import PixPaymentInformationProvider from "contexts/pixInformationContext";
import DonationSignInScreen from "screens/donations/auth/DonationSignInScreen";
import SignedInScreen from "screens/donations/auth/SignedInScreen";
import SignInScreen from "screens/auth/SignInScreen";
import InsertEmailScreen from "screens/auth/InsertEmailScreen";
import SentMagicLinkEmailScreen from "screens/auth/SentMagicLinkEmailScreen";
import InsertEmailAccountScreen from "screens/donations/auth/InsertEmailAccountScreen";
import { useAuthentication } from "contexts/authenticationContext";
import SignInByMagicLinkScreen from "screens/auth/SignInByMagicLinkScreen";
import ReceiveExtraTicketScreen from "screens/auth/ReceiveExtraTicketScreen";
import ExtraTicketScreen from "screens/auth/ExtraTicketScreen";
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
import { initializeDeeplink } from "../../services/deepLink";

const { primary } = theme.colors.brand;
const { neutral } = theme.colors;

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const activeColor = neutral[900];
  const { t } = useTranslation();

  const { currentUser } = useCurrentUser();

  const { currentIntegrationId, integration } = useIntegrationContext();

  const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;

  const { canDonate, refetch: refetchCanDonate } = useCanDonate(
    currentIntegrationId,
    PLATFORM,
  );

  const navigateToIntegration = () => {
    if (!integration?.integrationTask?.linkAddress) {
      return;
    }
    openInWebViewer(integration?.integrationTask?.linkAddress ?? "");
  };

  const sideLogo = () => {
    if (!isRibonIntegration && integration?.logo)
      return (
        <Image
          source={{ uri: integration?.logo }}
          accessibilityIgnoresInvertColors
          style={S.logo}
        />
      );
    return undefined;
  };

  const header = () => (
    <Header
      rightComponent={<LayoutHeader />}
      sideLogo={sideLogo()}
      onSideLogoClick={navigateToIntegration}
    />
  );
  const headerWithoutTicket = () => (
    <Header
      rightComponent={<LayoutHeader hideTicket />}
      sideLogo={sideLogo()}
      onSideLogoClick={navigateToIntegration}
    />
  );
  const headerWithWallet = () => (
    <Header
      rightComponent={<LayoutHeader hideTicket hideWallet={false} />}
      sideLogo={sideLogo()}
      onSideLogoClick={navigateToIntegration}
    />
  );

  React.useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  function renderTabBarIcon(color: any, iconOn: any, iconOff: any) {
    return color === activeColor ? iconOn : iconOff;
  }

  function renderForYouScreenHeader() {
    return canDonate ? null : headerWithoutTicket();
  }

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
            renderTabBarIcon(color, <CausesIconOn />, <CausesIconOff />),
          header,
          lazy: false,
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("homeNavBtn_click");
          },
        })}
      />

      <BottomTab.Screen
        name="ForYouScreen"
        component={ForYouScreen}
        options={{
          title: t("tabs.foryou") || "For you",
          tabBarIcon: ({ color }) =>
            renderTabBarIcon(color, <ForYouIconOn />, <ForYouIconOff />),
          lazy: false,
          header: () => renderForYouScreenHeader(),
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("forYouNavBtn_click");
          },
        })}
      />

      <BottomTab.Screen
        name="PromotersScreen"
        component={PromotersScreen}
        options={{
          title: t("tabs.giving") || "Donations",
          tabBarIcon: ({ color }: any) =>
            renderTabBarIcon(color, <GivingIconOn />, <GivingIconOff />),
          header: headerWithWallet,
          lazy: false,
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("giveNonProfitNavBtn_click", {
              from: "header",
            });
          },
        })}
      />

      <BottomTab.Screen
        name="ImpactScreen"
        component={ImpactScreen}
        options={{
          title: t("tabs.impact") || "Impact",
          tabBarIcon: ({ color }: any) =>
            renderTabBarIcon(color, <ImpactIconOn />, <ImpactIconOff />),
          header: headerWithoutTicket,
          lazy: false,
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("impactNavBtn_click");
          },
        })}
      />
    </BottomTab.Navigator>
  );
}

const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function PrivateNavigator() {
  const { navigateTo } = useNavigation();
  const { setCurrentIntegrationId, setExternalId } = useIntegrationContext();
  const { setUtm } = useUtmContext();
  const { setMagicLinkToken, setAccountId, setExtraTicket } =
    useAuthentication();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setMagicLinkToken,
      setAccountId,
      setExtraTicket,
    );
  }, []);

  return (
    /* todo: adds isAuthenticated logic to show the right screen in the component 
     prop eg. component={isAuthenticated ? BottomTabNavigator : LoginScreen} */
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name="Private"
        component={PrivateNavigator}
        options={{ headerShown: false }}
      />
    </PrivateStack.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  const { navigateTo } = useNavigation();
  const { setCurrentIntegrationId, setExternalId } = useIntegrationContext();
  const { setUtm } = useUtmContext();
  const { setMagicLinkToken, setAccountId, setExtraTicket } =
    useAuthentication();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setMagicLinkToken,
      setAccountId,
      setExtraTicket,
    );
  }, []);

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
        name="GiveTicketScreen"
        component={GiveTicketScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="ZeroTicketScreen"
        component={ZeroTicketScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="DonationDoneScreen"
        component={DonationDoneScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="PostDonationScreen"
        component={PostDonationScreen}
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
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RecurrenceScreen"
        component={RecurrenceScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PixInstructionsScreen"
        component={PixInstructionsScreen}
        options={{
          headerShown: false,
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
        name="SignedInScreen"
        component={SignedInScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
          headerBackTitleVisible: true,
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="DonationSignInScreen"
        component={DonationSignInScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
          headerBackTitleVisible: true,
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="ContributionStatsScreen"
        component={ContributionStatsScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
          headerBackTitleVisible: true,
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="MonthlyContributionsScreen"
        component={MonthlyContributionsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="InsertEmailScreen"
        component={InsertEmailScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="InsertEmailAccountScreen"
        component={InsertEmailAccountScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="SentMagicLinkEmailScreen"
        component={SentMagicLinkEmailScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="SignInByMagicLinkScreen"
        component={SignInByMagicLinkScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ReceiveExtraTicketScreen"
        component={ReceiveExtraTicketScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ExtraTicketScreen"
        component={ExtraTicketScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ExpiredLinkScreen"
        component={ExtraTicketScreen}
        options={{
          headerShown: true,
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
        <UtmProvider>
          <WalletProvider>
            <NetworkProvider>
              <CheckoutProvider>
                <CryptoPaymentProvider>
                  <CardPaymentInformationProvider>
                    <PixPaymentInformationProvider>
                      <CausesProvider>
                        <CauseDonationProvider>
                          <CauseContributionProvider>
                            <NonProfitsProvider>
                              <TicketsProvider>
                                <IntegrationProvider>
                                  <RootNavigator />
                                  <Toast config={toastConfig} />
                                </IntegrationProvider>
                              </TicketsProvider>
                            </NonProfitsProvider>
                          </CauseContributionProvider>
                        </CauseDonationProvider>
                      </CausesProvider>
                    </PixPaymentInformationProvider>
                  </CardPaymentInformationProvider>
                </CryptoPaymentProvider>
              </CheckoutProvider>
            </NetworkProvider>
          </WalletProvider>
        </UtmProvider>
      </LoadingOverlayProvider>
    </NavigationContainer>
  );
}
