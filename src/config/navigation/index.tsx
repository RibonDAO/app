import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import ClubCheckoutScreen from "screens/promoters/club/CheckoutScreen";
import { Theme } from "@react-navigation/native/src/types";
import { useTranslation } from "react-i18next";
import ContributionDoneScreen from "screens/promoters/ContributionDoneScreen";
import TicketsProvider from "contexts/ticketsContext";
import OnboardingScreen from "screens/onboarding/v2/OnboardingScreen";
import EarnTicketsScreen from "screens/content/EarnTicketsScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "lib/Toast";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useEffect } from "react";
import { useNavigation } from "hooks/useNavigation";
import GiveTicketScreen from "screens/donations/GiveTicketScreen";
import ContributionStatsScreen from "screens/users/ContributionStatsScreen";
import CheckoutProvider from "contexts/checkoutContext";
import NonProfitsProvider from "contexts/nonProfitsContext";
import { useCurrentUser } from "contexts/currentUserContext";
import IntegrationProvider, {
  useIntegrationContext,
} from "contexts/integrationContext";
import RecurrenceScreen from "screens/promoters/RecurrenceScreen";
import { Image } from "react-native";
import { openInWebViewer } from "lib/linkOpener";
import UtmProvider, { useUtmContext } from "contexts/utmContext";
import { logEvent } from "services/analytics";
import PixInstructionsScreen from "screens/promoters/PixInstructionsScreen";
import PixPaymentInformationProvider from "contexts/pixInformationContext";
import DonationSignInScreen from "screens/donations/auth/DonationSignInScreen";
import SignedInScreen from "screens/donations/auth/SignedInScreen";
import SignInScreen from "screens/auth/SignInScreen";
import SignInExtraTicketScreen from "screens/auth/SignInExtraTicketScreen";
import InsertEmailScreen from "screens/auth/InsertEmailScreen";
import SentMagicLinkEmailScreen from "screens/auth/SentMagicLinkEmailScreen";
import InsertEmailAccountScreen from "screens/donations/auth/InsertEmailAccountScreen";
import { useAuthentication } from "contexts/authenticationContext";
import SignInByMagicLinkScreen from "screens/auth/SignInByMagicLinkScreen";
import ReceiveExtraTicketScreen from "screens/auth/ReceiveExtraTicketScreen";
import ExtraTicketScreen from "screens/auth/ExtraTicketScreen";
import ExpiredLinkScreen from "screens/auth/ExpiredLinkScreen";
import ValidateExtraTicketScreen from "screens/auth/ValidateExtraTicketScreen";
import SelectTicketsScreen from "screens/donations/SelectTicketsScreen";
import ValidateAccountScreen from "screens/auth/ValidateAccountScreen";
import ClubContributionDoneScreen from "screens/promoters/ClubContributionDoneScreen";
import SubscriptionsScreen from "screens/promoters/SubscriptionsScreen";
import ClubScreen from "screens/promoters/ClubScreen";
import PromotersScreen from "screens/promoters/PromotersScreen";
import AboutTicketsScreen from "screens/content/AboutTicketsScreen";
import { initializeDeeplink } from "../../services/deepLink";
import S from "./styles";
import LinkingConfiguration from "./LinkingConfiguration";
import ImpactIconOn from "./assets/ImpactIconOn";
import ImpactIconOff from "./assets/ImpactIconOff";
import CausesIconOff from "./assets/CausesIconOff";
import CausesIconOn from "./assets/CausesIconOn";
import EarnTicketsIconOn from "./assets/EarnTicketsIconOn";
import EarnTicketsIconOff from "./assets/EarnTicketsIconOff";

const { primary } = theme.colors.brand;
const { neutral } = theme.colors;

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const activeColor = neutral[900];
  const { t } = useTranslation();

  const { currentIntegrationId, integration } = useIntegrationContext();
  const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;
  const { currentUser } = useCurrentUser();

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

  const headerOutline = () => (
    <Header
      outline={!!currentUser}
      rightComponent={<LayoutHeader outline={!!currentUser} />}
      sideLogo={sideLogo()}
      onSideLogoClick={navigateToIntegration}
    />
  );

  function renderTabBarIcon(color: any, iconOn: any, iconOff: any) {
    return color === activeColor ? iconOn : iconOff;
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
          title: t("tabs.donateTickets") || "Donate tickets",
          tabBarIcon: ({ color }) =>
            renderTabBarIcon(color, <CausesIconOn />, <CausesIconOff />),
          headerShown: false,
          lazy: false,
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("homeNavBtn_click");
          },
        })}
      />

      <BottomTab.Screen
        name="EarnTicketsScreen"
        component={EarnTicketsScreen}
        options={{
          title: t("tabs.earnTickets") || "Earn Tickets",
          tabBarIcon: ({ color }) =>
            renderTabBarIcon(
              color,
              <EarnTicketsIconOn />,
              <EarnTicketsIconOff />,
            ),
          lazy: false,
          header,
        }}
        listeners={() => ({
          tabPress: () => {
            logEvent("earnTicketsNavBtn_click");
          },
        })}
      />

      <BottomTab.Screen
        name="ImpactScreen"
        component={ImpactScreen}
        options={{
          title: t("tabs.myImpact") || "My impact",

          tabBarIcon: ({ color }: any) =>
            renderTabBarIcon(color, <ImpactIconOn />, <ImpactIconOff />),
          header: headerOutline,
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
  const {
    setMagicLinkToken,
    setAccountId,
    setExtraTicket,
    setExtraTicketToken,
  } = useAuthentication();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setMagicLinkToken,
      setAccountId,
      setExtraTicket,
      setExtraTicketToken,
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
  const {
    setMagicLinkToken,
    setAccountId,
    setExtraTicket,
    setExtraTicketToken,
  } = useAuthentication();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setMagicLinkToken,
      setAccountId,
      setExtraTicket,
      setExtraTicketToken,
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
        name="PromotersScreen"
        component={PromotersScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GiveTicketScreen"
        component={GiveTicketScreen}
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
        name="SelectTicketsScreen"
        component={SelectTicketsScreen}
        options={{
          headerShown: false,
        }}
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
        name="ClubCheckoutScreen"
        component={ClubCheckoutScreen}
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
        name="SubscriptionsScreen"
        component={SubscriptionsScreen}
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
        name="SignInExtraTicketScreen"
        component={SignInExtraTicketScreen}
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
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ValidateExtraTicketScreen"
        component={ValidateExtraTicketScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ExtraTicketScreen"
        component={ExtraTicketScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ExpiredLinkScreen"
        component={ExpiredLinkScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ValidateAccountScreen"
        component={ValidateAccountScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.brand.primary[800],
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="ClubScreen"
        component={ClubScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ClubContributionDoneScreen"
        component={ClubContributionDoneScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AboutTicketsScreen"
        component={AboutTicketsScreen}
        options={{
          headerShown: false,
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
                              <IntegrationProvider>
                                <TicketsProvider>
                                  <RootNavigator />
                                  <Toast config={toastConfig} />
                                </TicketsProvider>
                              </IntegrationProvider>
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
