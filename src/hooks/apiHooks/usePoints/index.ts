import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "@ribon.io/shared/hooks";
import pointsApi from "services/api/pointsApi";

function useImpact() {
  const { currentUser } = useCurrentUser();
  const { data: userPoints, refetch, isLoading } = useApi<any>({
    key: "points",
    fetchMethod: () => {
      const id = currentUser?.id || null;
      return pointsApi.getPoints(id);
    },
    options: {
      enabled: !!currentUser?.id,
    },
  });

  return {
    userPoints,
    refetch,
    isLoading,
  };
}

export default useImpact;
