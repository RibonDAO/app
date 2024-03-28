import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useImpact,
  useStatistics,
  useUserProfile,
} from "@ribon.io/shared/hooks";
import usePageView from "hooks/usePageView";
import { logError } from "services/crashReport";
import { RefreshControl } from "react-native";
import TabViewSection from "./TabViewSection";
import * as S from "./styles";

function ImpactScreen() {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { userProfile } = useUserProfile();
  const { isLoading, refetch: refetchUserProfile } = userProfile();
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });
  const [refreshing, setRefreshing] = useState(false);
  usePageView("P9_view");

  useFocusEffect(
    useCallback(() => {
      refetchImpact();
      refetchStatistics();
    }, []),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      refetchImpact();
      refetchStatistics();
      refetchUserProfile();
    } catch (e) {
      logError(e);
    } finally {
      setRefreshing(false);
    }
  }, [refetchImpact, refetchStatistics]);

  return (
    <S.Container
      outline={!!currentUser && !isLoading}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TabViewSection />
    </S.Container>
  );
}

export default ImpactScreen;
