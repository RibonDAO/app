import React, { useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import usePageView from "hooks/usePageView";
import TabViewSection from "./TabViewSection";
import S from "./styles";
import ProfileSection from "./ProfileSection";

function ImpactScreen() {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });
  usePageView("P9_view");

  useFocusEffect(
    useCallback(() => {
      refetchImpact();
      refetchStatistics();
    }, []),
  );

  return (
    <View style={S.container}>
      <ProfileSection />
      <View style={{ paddingBottom: 40 }}>
        <TabViewSection />
      </View>
    </View>
  );
}

export default ImpactScreen;
