import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NonProfit } from "@ribon.io/shared/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  DonateModal: ModalParamList;
  DonationDonePage: DonationDoneParamsList;
  NotFound: undefined;
};

export type ModalParamList = {
  nonProfit: NonProfit;
};

export type DonationDoneParamsList = {
  nonProfit: NonProfit;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  GivingsPage: undefined;
  ProfilePage: undefined;
  CausesPage: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
