import MockAdapter from "axios-mock-adapter";
import api from "services/api";
import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "types";

const mockApi = new MockAdapter(api);

export type mockRequestProps = {
  payload?: any;
  status?: number;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

const requestByType = (method: string, url: string) => {
  const requestsObject: Record<string, any> = {
    GET: mockApi.onGet(url),
    POST: mockApi.onPost(url),
    PATCH: mockApi.onPatch(url),
    PUT: mockApi.onPut(url),
    DELETE: mockApi.onDelete(url),
  };

  return requestsObject[method];
};
export const mockRequest = (
  url: string,
  { payload, status = 200, method = "GET" }: mockRequestProps,
) => {
  const request = requestByType(method, url);
  request.reply(status, payload);
};

export const mockEnv = (envVars: Record<any, any>) => {
  const INITIAL_ENV = process.env;

  beforeEach(() => {
    process.env = {
      ...INITIAL_ENV,
      ...envVars,
    };
  });

  afterAll(() => {
    process.env = INITIAL_ENV;
  });
};

export const testLinkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Root: {
        screens: {
          CausesScreen: {
            screens: {
              CausesScreen: "causes",
              ReceiveTicketScreen: "receive-ticket",
              DonationDoneScreen: "donation-done",
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
        },
      },
      DonateModal: "modal",
      NotFound: "*",
    },
  },
};
