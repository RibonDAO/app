import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Cause, Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import { LocationStateType } from "screens/donations/CausesScreen/LocationStateType";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {}
}

export type DonateScreenList = {
  nonProfit: NonProfit;
  offer: Offer;
};

export type DonationDoneParamsList = {
  nonProfit: NonProfit;
  offer: Offer;
  flow: string;
  impact?: number;
};

export type EarnTicketsScreenParamsList = {
  currentTab?: number;
};

export type ContributionDoneParamsList = {
  nonProfit?: NonProfit;
  cause?: Cause;
  offer?: Offer;
};

export type ContributionStatsScreenParamsList = {
  contributionId: number;
};

export type GiveTicketScreenParamList = {
  isOnboarding?: boolean;
};

export type CommunityAddModalParamList = {
  amount: string;
};

export type PaymentPageList = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
  flow: string;
  value?: string;
  currency?: string;
};

export type PromotersScreenParams = {
  isInCommunity?: boolean;
};

export type PostDonationScreenParams = {
  nonProfit: NonProfit;
  cause: Cause;
};

export type CausesScreenParamList = {
  newState: LocationStateType;
};

export type RootTabParamList = {
  CausesScreen: CausesScreenParamList;
  EarnTicketsScreen: undefined;
  ImpactScreen: undefined;
  PromotersScreen: PromotersScreenParams;
  PostDonationScreen: PostDonationScreenParams;
  ClubScreen: undefined;
  OnboardingScreen: undefined;
};

export type SupportNonProfitParamList = {
  causeDonated?: Cause;
};

export type CheckoutScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
  subscription?: boolean;
};

export type ClubCheckoutScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
  subscription?: boolean;
};

export type RecurrenceScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
};

export type SelectTicketsScreenParamList = {
  nonProfit: NonProfit;
  cause: Cause;
};

export type SubscriptionsScreenParamList = {
  from: string;
};

export type PixInstructionsScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
};

export type InsertEmailAccountParamsList = {
  nonProfit: NonProfit;
};

export type SentMagicLinkEmailParamsList = {
  email: string;
};

export type ValidateAccountScreenParamsList = {
  from: string;
};

export type AboutTicketsScreenParamsList = {
  from: string;
  title: string;
  buttonText: string;
  buttonOnPress: () => void;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  PrivateStack: undefined;
  SignInScreen: undefined;
  SignInExtraTicketScreen: undefined;
  DonationSignInScreen: DonateScreenList;
  SignedInScreen: DonateScreenList;
  DonationDoneScreen: DonationDoneParamsList;
  ContributionDoneScreen: ContributionDoneParamsList;
  AvailableArticleScreen: undefined;
  NotFound: undefined;
  ReceiveTicketScreen: undefined;
  GiveTicketScreen: GiveTicketScreenParamList;
  GiveTicketV2Screen: undefined;
  CausesScreen: CausesScreenParamList;
  EarnTicketsScreen: EarnTicketsScreenParamsList;
  PostDonationScreen: PostDonationScreenParams;
  CommunityAddModal: CommunityAddModalParamList;
  PaymentScreen: PaymentPageList;
  SupportNonProfitScreen: SupportNonProfitParamList;
  PromotersScreen: PromotersScreenParams;
  CheckoutScreen: CheckoutScreenParamList;
  ClubCheckoutScreen: ClubCheckoutScreenParamList;
  ValidateExtraTicketScreen: undefined;
  RecurrenceScreen: RecurrenceScreenParamList;
  SelectTicketsScreen: SelectTicketsScreenParamList;
  PixInstructionsScreen: PixInstructionsScreenParamList;
  OnboardingScreen: undefined;
  DonateModal: undefined;
  ContributionStatsScreen: ContributionStatsScreenParamsList;
  SubscriptionsScreen: SubscriptionsScreenParamList;
  InsertEmailScreen: undefined;
  SentMagicLinkEmailScreen: SentMagicLinkEmailParamsList;
  SignInByMagicLinkScreen: undefined;
  InsertEmailAccountScreen: InsertEmailAccountParamsList;
  ReceiveExtraTicketScreen: undefined;
  ExtraTicketScreen: undefined;
  ExpiredLinkScreen: undefined;
  ValidateAccountScreen: ValidateAccountScreenParamsList;
  ClubContributionDoneScreen: undefined;
  ClubScreen: undefined;
  AboutTicketsScreen: AboutTicketsScreenParamsList;
};

export type PrivateStackParamList = {
  // todo: update with the screens that are private
  Private: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
