import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "@ribon.io/shared/hooks";
import badgesApi from "services/api/badgesApi";

function useImpact() {
  const { currentUser } = useCurrentUser();
  const { data: userBadges, refetch, isLoading } = useApi<any[]>({
    key: "badges",
    fetchMethod: () => {
      const id = currentUser?.id || null;
      return badgesApi.getBadges(id);
    },
    options: {
      enabled: !!currentUser?.id,
    },
  });

  return {
    userBadges,
    refetch,
    isLoading,
  };
}

export default useImpact;
