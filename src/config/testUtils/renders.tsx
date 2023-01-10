import React from "react";
import { render, RenderResult } from "@testing-library/react-native";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n-test";
import { QueryClient, QueryClientProvider } from "react-query";

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
};

function renderAllProviders(children: any, {}: RenderComponentProps = {}) {
  const queryClient = new QueryClient();

  return {
    component: (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
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
