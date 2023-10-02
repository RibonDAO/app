import { useNavigation as useNavigationNative } from "@react-navigation/native";

export function useNavigation() {
  const { navigate, goBack } = useNavigationNative();

  function navigateTo(screenName: string, params?: Record<any, any>) {
    navigate([screenName, params] as never);
  }

  function popNavigation() {
    goBack();
  }

  return {
    navigateTo,
    popNavigation,
  };
}
