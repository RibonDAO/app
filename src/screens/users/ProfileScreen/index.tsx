import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import { logEvent } from "services/analytics";
import Button from "components/atomics/buttons/Button";
import { shareSocial, SocialTypes } from "services/social/shareImage";
import TabViewSection from "./TabViewSection";
import S from "./styles";

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
  const handleShareClickTwitter = async () => {
    const imageUrl =
      "https://media.discordapp.net/attachments/1008571091616276541/1106679413854187630/nicknish_people_happy_drinking_potable_water_cartoon_like_futur_078c80a5-7617-4b7f-8fa9-3a0e46882e3b.png?width=619&height=619";

    try {
      await shareSocial(imageUrl, SocialTypes.TWITTER);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={S.container}>
      <Button text="share twitter" onPress={handleShareClickTwitter} />
      <View style={{ paddingBottom: 40 }}>
        <TabViewSection />
      </View>
    </View>
  );
}

export default ProfileScreen;
