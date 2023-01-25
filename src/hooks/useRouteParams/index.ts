import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "types";

export function useRouteParams<T extends keyof RootStackParamList>() {
  const route = useRoute<RouteProp<RootStackParamList, T>>();

  return route;
}
