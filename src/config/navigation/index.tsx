/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WalletProvider from "contexts/walletContext";
import NetworkProvider from "contexts/networkContext";
import CryptoPaymentProvider from "contexts/cryptoPaymentContext";
import CausesProvider from "contexts/causesContext";
import CauseContributionProvider from "contexts/causesContributionContext";
import TagDonationProvider from "contexts/tagDonationContext";
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
import InsertEmailScreen from "screens/auth/InsertEmailScreen";
import InsertOtpCodeScreen from "screens/auth/InsertOtpCodeScreen";
import InsertEmailAccountScreen from "screens/donations/auth/InsertEmailAccountScreen";
import SelectTicketsScreen from "screens/donations/SelectTicketsScreen";
import ValidateAccountScreen from "screens/auth/ValidateAccountScreen";
import ClubContributionDoneScreen from "screens/promoters/ClubContributionDoneScreen";
import SubscriptionsScreen from "screens/promoters/SubscriptionsScreen";
import ClubScreen from "screens/promoters/ClubScreen";
import PromotersScreen from "screens/promoters/PromotersScreen";
import GiveTicketByCouponScreen from "screens/coupons/GiveTicketByCouponScreen";
import CouponProvider, { useCouponContext } from "contexts/couponContext";
import ExpiredCouponScreen from "screens/coupons/ExpiredCouponScreen";
import GiveTicketV2Screen from "screens/donations/GiveTicketV2Screen";
import AboutTicketsScreen from "screens/content/AboutTicketsScreen";
import SignInCouponScreen from "screens/coupons/auth/SignInCouponScreen";
import InsertEmailCouponScreen from "screens/coupons/auth/InsertEmailCouponScreen";
import ChangeLanguageScreen from "screens/users/ConfigScreen/ChangeLanguageScreen";
import ConfigScreen from "screens/users/ConfigScreen";
import HomeScreen from "screens/donations/HomeScreen";
import { ArrowBackButton } from "components/atomics/buttons/ArrowBackButton";
import PaymentFailedNotificationProvider from "contexts/paymentFailedNotificationContext";
import ClubSubscriptionProvider from "contexts/clubSubscriptionContext";
import TagsProvider from "contexts/tagsContext";
import { initializeDeeplink } from "../../services/deepLink";
import LinkingConfiguration from "./LinkingConfiguration";
import ImpactIconOn from "./assets/ImpactIconOn";
import ImpactIconOff from "./assets/ImpactIconOff";
import CausesIconOff from "./assets/CausesIconOff";
import CausesIconOn from "./assets/CausesIconOn";
import EarnTicketsIconOn from "./assets/EarnTicketsIconOn";
import EarnTicketsIconOff from "./assets/EarnTicketsIconOff";
import S from "./styles";

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
          headerShown: false,
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
          headerShown: false,
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
  const { setCouponId } = useCouponContext();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setCouponId,
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
  const { setCouponId } = useCouponContext();
  useEffect(() => {
    initializeDeeplink(
      navigateTo,
      setCurrentIntegrationId,
      setExternalId,
      setUtm,
      setCouponId,
    );
  }, []);
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
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
        name="GiveTicketByCouponScreen"
        component={GiveTicketByCouponScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="SignInCouponScreen"
        component={SignInCouponScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="InsertEmailCouponScreen"
        component={InsertEmailCouponScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="ExpiredCouponScreen"
        component={ExpiredCouponScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="GiveTicketV2Screen"
        component={GiveTicketV2Screen}
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
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="DonationSignInScreen"
        component={DonationSignInScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ContributionStatsScreen"
        component={ContributionStatsScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
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
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="InsertEmailScreen"
        component={InsertEmailScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="InsertEmailAccountScreen"
        component={InsertEmailAccountScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="InsertOtpCodeScreen"
        component={InsertOtpCodeScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="ValidateAccountScreen"
        component={ValidateAccountScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: "",
          headerShadowVisible: false,
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
          animation: "slide_from_bottom",
        }}
      />

      <Stack.Screen
        name="ConfigScreen"
        component={ConfigScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: t("configScreen.title") || "Settings",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{
          headerShown: true,
          headerLeft: () => <ArrowBackButton />,
          headerTitle: t("changeLanguageScreen.title") || "Change Language",
          headerShadowVisible: false,
          headerTitleAlign: "center",
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
                        <NonProfitsProvider>
                          <TagsProvider>
                            <TagDonationProvider>
                              <CauseContributionProvider>
                                <IntegrationProvider>
                                  <CouponProvider>
                                    <TicketsProvider>
                                      <PaymentFailedNotificationProvider>
                                        <ClubSubscriptionProvider>
                                          <RootNavigator />
                                          <Toast config={toastConfig} />
                                        </ClubSubscriptionProvider>
                                      </PaymentFailedNotificationProvider>
                                    </TicketsProvider>
                                  </CouponProvider>
                                </IntegrationProvider>
                              </CauseContributionProvider>
                            </TagDonationProvider>
                          </TagsProvider>
                        </NonProfitsProvider>
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
