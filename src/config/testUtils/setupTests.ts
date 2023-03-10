export const mockNavigationFunction = jest.fn();
export const mockNavigateBackFunction = jest.fn();
export const mockLogErrorFunction = jest.fn();
export const mockLogEventFunction = jest.fn();

function setupMocks() {
  jest.mock("hooks/useNavigation", () => ({
    __esModule: true,
    useNavigation: () => ({
      navigateTo: mockNavigationFunction,
      popNavigation: mockNavigateBackFunction,
    }),
  }));
  jest.mock("services/crashReport", () => ({
    __esModule: true,
    logError: mockLogErrorFunction,
  }));
  jest.mock("services/analytics", () => ({
    __esModule: true,
    logEvent: mockLogEventFunction,
  }));
  jest.mock("hooks/useNavigationReady", () => ({
    __esModule: true,
    default: () => true,
  }));
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
}

setupMocks();
