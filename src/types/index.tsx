import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Cause, NonProfit, Offer } from "@ribon.io/shared/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {}
}

export type DonateScreenList = {
  nonProfit: NonProfit;
};

export type DonationDoneParamsList = {
  nonProfit: NonProfit;
};

export type ContributionDoneParamsList = {
  nonProfit?: NonProfit;
  cause?: Cause;
};

export type CommunityAddModalParamList = {
  amount: string;
};

export type PaymentPageList = {
  offer: Offer;
  cause?: Cause;
  nonProfit?: NonProfit;
  flow: string;
};

export type PromotersScreenParams = {
  isInCommunity?: boolean;
};

export type RootTabParamList = {
  CausesScreen: undefined;
  ForYouScreen: undefined;
  ProfileScreen: undefined;
  PromotersScreen: PromotersScreenParams;
  ChooseCauseScreen: undefined;
};

export type SupportNonProfitParamList = {
  causeDonated?: Cause;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  DonateScreen: DonateScreenList;
  DonationDoneScreen: DonationDoneParamsList;
  ContributionDoneScreen: ContributionDoneParamsList;
  AvailableArticleScreen: undefined;
  NotFound: undefined;
  ReceiveTicketScreen: undefined;
  CausesScreen: undefined;
  ForYouScreen: undefined;
  ChooseCauseScreen: undefined;
  CommunityAddModal: CommunityAddModalParamList;
  PaymentScreen: PaymentPageList;
  SupportNonProfitScreen: SupportNonProfitParamList;
  PromotersScreen: PromotersScreenParams;
  OnboardingScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
