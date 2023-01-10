import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useLayout = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return { width, height, top, bottom };
};

export default useLayout;
