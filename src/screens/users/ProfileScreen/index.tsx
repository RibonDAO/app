import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useStatistics } from "@ribon.io/shared/hooks";
import ImpactCards from "./ImpactCards";
import TabViewSection from "./TabViewSection";
import S from "./styles";
import Button from "components/atomics/buttons/Button";
import Share from 'react-native-share';
import images from 'assets/images/base64';

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

    const shareImageToInstagram = async () => {
        const shareOptions = {
            title: 'Share image to instagram',
            type: 'image/jpeg',
            url: images.image1,
            social: Share.Social.INSTAGRAM,
        };

        try {
            const ShareResponse = await Share.shareSingle(shareOptions);
            console.log(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            console.log('error: '.concat(getErrorString(error)));
        }
    };

  return (
    <View style={S.container}>
        <Button text="share" onPress={shareImageToInstagram} />
      <View style={{ paddingBottom: 40 }}>
        <TabViewSection />
      </View>
    </View>
  );
}

export default ProfileScreen;
