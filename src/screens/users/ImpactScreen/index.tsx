import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useImpact,
  useStatistics,
  useUserProfile,
} from "@ribon.io/shared/hooks";
import usePageView from "hooks/usePageView";
import TabViewSection from "./TabViewSection";
import * as S from "./styles";

function ImpactScreen() {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { userProfile } = useUserProfile();
  const { refetch: refetchUserProfile } = userProfile();
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });
  usePageView("P9_view");

  useFocusEffect(
    useCallback(() => {
      refetchImpact();
      refetchStatistics();
      refetchUserProfile();
    }, []),
  );

  return (
    <S.Container>
      <TabViewSection />
    </S.Container>
  );
}

export default ImpactScreen;
