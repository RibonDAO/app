import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import { logEvent } from "services/analytics";
import TabViewSection from "./TabViewSection";
import S from "./styles";

function ProfileScreen() {
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });
  const ref = React.useRef(null);

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
      <View style={{ paddingBottom: 40 }} ref={ref}>
        <TabViewSection />
      </View>
    </View>
  );
}

export default ProfileScreen;
