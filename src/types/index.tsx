import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Cause, Currencies, NonProfit, Offer } from "@ribon.io/shared/types";

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
};

export type ForYouScreenParamsList = {
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

export type RootTabParamList = {
  CausesScreen: undefined;
  ForYouScreen: undefined;
  ImpactScreen: undefined;
  PromotersScreen: PromotersScreenParams;
  PostDonationScreen: PostDonationScreenParams;
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

export type RecurrenceScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
};

export type MonthlyContributionsScreenParamList = {
  from: string;
};

export type PixInstructionsScreenParamList = {
  target: string;
  targetId: string;
  offer: number;
  currency: Currencies;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  PrivateStack: undefined;
  DonateScreen: DonateScreenList;
  DonationDoneScreen: DonationDoneParamsList;
  ContributionDoneScreen: ContributionDoneParamsList;
  AvailableArticleScreen: undefined;
  NotFound: undefined;
  ReceiveTicketScreen: undefined;
  GiveTicketScreen: GiveTicketScreenParamList;
  ZeroTicketScreen: undefined;
  CausesScreen: undefined;
  ForYouScreen: ForYouScreenParamsList;
  PostDonationScreen: PostDonationScreenParams;
  CommunityAddModal: CommunityAddModalParamList;
  PaymentScreen: PaymentPageList;
  SupportNonProfitScreen: SupportNonProfitParamList;
  PromotersScreen: PromotersScreenParams;
  CheckoutScreen: CheckoutScreenParamList;
  RecurrenceScreen: RecurrenceScreenParamList;
  PixInstructionsScreen: PixInstructionsScreenParamList;
  OnboardingScreen: undefined;
  DonateModal: undefined;
  ContributionStatsScreen: ContributionStatsScreenParamsList;
  MonthlyContributionsScreen: MonthlyContributionsScreenParamList;
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
