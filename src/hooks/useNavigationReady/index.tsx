import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const useNavigationReady = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (!isReady) setIsReady(true);
    }, 1)
  }, []);

  return isReady;
};

export default useNavigationReady;
