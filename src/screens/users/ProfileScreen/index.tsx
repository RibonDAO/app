import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Text, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import ImpactCards from "./ImpactCards";
import TabViewSection from "./TabViewSection";
import S from "./styles";

function ProfileScreen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen",
  });
  const { currentUser } = useCurrentUser();
  const { refetch: refetchImpact } = useImpact(currentUser?.id);
  const { refetch: refetchStatistics } = useStatistics({
    userId: currentUser?.id,
  });

  useFocusEffect(
    useCallback(() => {
      refetchImpact();
      refetchStatistics();
    }, []),
  );

  return (
    <ScrollView style={S.container} showsVerticalScrollIndicator={false}>
      <View style={{ paddingBottom: 40 }}>
        <View style={S.cardsSection}>
          <Text style={S.title}>{t("title")}</Text>
          <ImpactCards />
        </View>

        <TabViewSection />
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
