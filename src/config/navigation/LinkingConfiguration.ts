/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      TabNavigator: {
        screens: {
          OnboardingScreen: {
            screens: {
              OnboardingScreen: "onboarding",
            },
          },
          CausesScreen: {
            screens: {
              CausesScreen: "causes",
              ReceiveTicketScreen: "receive-ticket",
              GiveTicketScreen: "give-ticket",
              GiveTicketV2Screen: "give-ticket-v2",
              DonationDoneScreen: "donation-done",
              SignInByMagicLinkScreen: "auth",
            },
          },
          EarnTicketsScreen: {
            screens: {
              NewsScreen: "news",
            },
          },
          ImpactScreen: {
            screens: {
              ImpactScreen: "impact",
            },
          },
          PromotersScreen: {
            screens: {
              PromotersScreen: "promoters",
            },
          },
          ClubScreen: {
            screens: {
              ClubScreen: "club",
            },
          },
          HomeScreen: {
            screens: {
              HomeScreen: "home",
            },
          },
        },
      },
      DonateModal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
