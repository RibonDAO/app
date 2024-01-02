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
      Root: {
        screens: {
          CausesScreen: {
            screens: {
              CausesScreen: "causes",
              ReceiveTicketScreen: "receive-ticket",
              DonationDonePage: "donation-done",
              SigninByMagicLinkScreen: "auth",
            },
          },
          ForYouScreen: {
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
        },
      },
      DonateModal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
