import { useEffect, useState } from "react";

const useNavigationReady = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (!isReady) setIsReady(true);
    }, 5);
  }, []);

  return isReady;
};

export default useNavigationReady;
