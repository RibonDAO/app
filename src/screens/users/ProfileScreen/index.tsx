import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import TabViewSection from "./TabViewSection";
import S from "./styles";
import { logEvent } from "services/analytics";

function ProfileScreen() {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  useEffect(() => {
    logEvent("P9_view");
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetchImpact();
      refetchStatistics();
    }, []),
  );

  return (
    <View style={S.container}>
      <View style={{ paddingBottom: 40 }}>
        <TabViewSection />
      </View>
    </View>
  );
}

export default ProfileScreen;
