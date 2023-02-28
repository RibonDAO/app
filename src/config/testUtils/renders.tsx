import React from "react";
import { render, RenderResult } from "@testing-library/react-native";
import {
  renderHook as renderTestingLibraryHook,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import NetworkProvider, {
  INetworkContext,
  NetworkContext,
} from "contexts/networkContext";
import WalletProvider, {
  IWalletContext,
  WalletContext,
} from "contexts/walletContext";
import CryptoPaymentProvider, {
  CryptoPaymentContext,
  ICryptoPaymentContext,
} from "contexts/cryptoPaymentContext";
import LoadingOverlayProvider, {
  ILoadingOverlayContext,
  LoadingOverlayContext,
} from "contexts/loadingOverlayContext";
import CardPaymentInformationProvider, {
  CardPaymentInformationContext,
  ICardPaymentInformationContext,
} from "contexts/cardPaymentInformationContext";
import TicketsProvider, {
  ITicketsContext,
  TicketsContext,
} from "contexts/ticketsContext";
import ScrollEnabledProvider, {
  IScrollEnabledContext,
  ScrollEnabledContext,
} from "contexts/scrollEnabledContext";
import i18n from "../../../i18n-test";

export interface RenderWithContextResult {
  component: RenderResult;
}

function renderProvider(
  RProvider: any,
  RContext: React.Context<any>,
  value: Record<any, any>,
  children: JSX.Element,
) {
  return (
    <RProvider>
      <RContext.Consumer>
        {(val: Record<any, any>) => (
          <RContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
              ...val,
              ...value,
            }}
          >
            {children}
          </RContext.Provider>
        )}
      </RContext.Consumer>
    </RProvider>
  );
}

export type RenderComponentProps = {
  locationState?: Record<any, any>;
  networkProviderValue?: Partial<INetworkContext>;
  walletProviderValue?: Partial<IWalletContext>;
  loadingOverlayValue?: Partial<ILoadingOverlayContext>;
  cryptoPaymentProviderValue?: Partial<ICryptoPaymentContext>;
  cardPaymentProviderValue?: Partial<ICardPaymentInformationContext>;
  ticketsProviderValue?: Partial<ITicketsContext>;
  scrollEnabledProviderValue?: Partial<IScrollEnabledContext>;
};

function renderAllProviders(
  children: any,
  {
    networkProviderValue = {},
    walletProviderValue = {},
    cryptoPaymentProviderValue = {},
    loadingOverlayValue = {},
    cardPaymentProviderValue = {},
    ticketsProviderValue = {},
    scrollEnabledProviderValue = {},
  }: RenderComponentProps = {},
) {
  const queryClient = new QueryClient();

  return {
    component: (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          {renderProvider(
            LoadingOverlayProvider,
            LoadingOverlayContext,
            loadingOverlayValue,
            renderProvider(
              WalletProvider,
              WalletContext,
              walletProviderValue,
              renderProvider(
                NetworkProvider,
                NetworkContext,
                networkProviderValue,
                renderProvider(
                  CryptoPaymentProvider,
                  CryptoPaymentContext,
                  cryptoPaymentProviderValue,
                  renderProvider(
                    CardPaymentInformationProvider,
                    CardPaymentInformationContext,
                    cardPaymentProviderValue,
                    renderProvider(
                      TicketsProvider,
                      TicketsContext,
                      ticketsProviderValue,
                      renderProvider(
                        ScrollEnabledProvider,
                        ScrollEnabledContext,
                        scrollEnabledProviderValue,
                        children,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          )}
        </I18nextProvider>
      </QueryClientProvider>
    ),
  };
}

export function renderComponent(
  component: JSX.Element,
  renderComponentProps: RenderComponentProps = {},
): RenderWithContextResult {
  const { component: componentWithProviders } = renderAllProviders(
    component,
    renderComponentProps,
  );
  return {
    component: render(componentWithProviders),
  };
}

type RenderHookReturn = {
  hook: RenderHookResult<any, any>;
};
export function renderHook(
  hook: (props: any) => any,
  renderComponentProps: RenderComponentProps = {},
): RenderHookReturn {
  const wrapper = ({ children }: any) => {
    const { component } = renderAllProviders(children, renderComponentProps);
    return component;
  };

  return {
    hook: renderTestingLibraryHook(hook, { wrapper }),
  };
}
