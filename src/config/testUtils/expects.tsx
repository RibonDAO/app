import { screen } from "@testing-library/react-native";
import {
  mockLogErrorFunction,
  mockNavigationFunction,
  mockNavigateBackFunction,
  mockLogEventFunction,
} from "config/testUtils/setupTests";

export function expectTextToBeInTheDocument(text: string) {
  return expect(screen.getByText(text)).toBeDefined();
}

export function expectTextNotToBeInTheDocument(text: string) {
  return expect(screen.queryByText(text)).toEqual(null);
}

export function expectDisplayValueToBeInTheDocument(value: string) {
  return expect(screen.getByDisplayValue(value)).toBeDefined();
}

export function expectLogErrorToHaveBeenCalled(error?: any) {
  if (error) return expect(mockLogErrorFunction).toHaveBeenCalledWith(error);

  return expect(mockLogErrorFunction).toHaveBeenCalled();
}

export function expectLogEventToHaveBeenCalledWith(
  event: string,
  params?: Record<any, any>,
) {
  if (params)
    return expect(mockLogEventFunction).toHaveBeenCalledWith(event, params);

  return expect(mockLogEventFunction).toHaveBeenCalledWith(event, {});
}

type expectPageToNavigateToType = {
  state?: Record<any, any>;
};

export function expectPageToNavigateTo(
  pathname: string,
  { state }: expectPageToNavigateToType = {},
) {
  if (!state)
    return expect(mockNavigationFunction).toHaveBeenCalledWith(pathname);

  return expect(mockNavigationFunction).toHaveBeenCalledWith({
    pathname,
    state,
  });
}

export function expectPageToNavigateBack() {
  return expect(mockNavigateBackFunction).toHaveBeenCalled();
}
