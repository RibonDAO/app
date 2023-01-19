import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NonProfit } from "@ribon.io/shared/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation { }
}

export type ModalParamList = {
  nonProfit: NonProfit;
};

export type DonationDoneParamsList = {
  nonProfit: NonProfit;
};

export type RootTabParamList = {
  CausesScreen: undefined;
  ProfileScreen: undefined;
  ReceiveTicketScreen: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  DonateModal: ModalParamList;
  DonationDoneScreen: DonationDoneParamsList;
  NotFound: undefined;
  ChooseCauseScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
