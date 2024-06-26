import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import SupportNonProfitScreen from "screens/promoters/SupportNonProfitScreen";
import SupportCauseScreen from "screens/promoters/SupportCauseScreen";
import { useRouteParams } from "hooks/useRouteParams";
import { logEvent } from "services/analytics";
import S from "./styles";

export default function PromotersScreen() {
  const { params } = useRouteParams<"PromotersScreen">();
  const [submenuVisible, setSubmenuVisible] = useState(true);
  const [isInCommunityDonationFlow, setIsInCommunityDonationFlow] = useState(
    params?.isInCommunity ?? true,
  );
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCauseScreen",
  });

  useEffect(() => {
    setIsInCommunityDonationFlow(params?.isInCommunity ?? true);
  }, [params?.isInCommunity]);

  return (
    <View>
      <View style={S.container}>
        <View>
          <TouchableOpacity
            accessibilityRole="button"
            style={S.collapsibleButton}
            onPress={() => {
              setSubmenuVisible(!submenuVisible);
            }}
          >
            {submenuVisible ? (
              <Icon
                type="rounded"
                name="expand_more"
                size={30}
                color={theme.colors.neutral[500]}
              />
            ) : (
              <Icon
                type="rounded"
                name="expand_less"
                size={30}
                color={theme.colors.neutral[500]}
              />
            )}
          </TouchableOpacity>
        </View>
        {submenuVisible && (
          <View style={S.buttonsContainer}>
            <Button
              text={t("firstButtonText")}
              onPress={() => {
                setIsInCommunityDonationFlow(true);
                setSubmenuVisible(false);
                logEvent("giveCauseNavBtn_click", {
                  from: "subheader",
                });
              }}
              backgroundColor={
                isInCommunityDonationFlow
                  ? theme.colors.neutral[800]
                  : theme.colors.gray10
              }
              textColor={
                isInCommunityDonationFlow
                  ? theme.colors.neutral10
                  : theme.colors.neutral[800]
              }
              borderColor={theme.colors.neutral[800]}
              customStyles={S.firstButton}
              customTextStyles={S.buttonText}
            />
            <Button
              text={t("secondButtonText")}
              onPress={() => {
                setIsInCommunityDonationFlow(false);
                setSubmenuVisible(false);
                logEvent("giveNonProfitNavBtn_click", {
                  from: "subheader",
                });
              }}
              backgroundColor={
                isInCommunityDonationFlow
                  ? theme.colors.gray10
                  : theme.colors.neutral[800]
              }
              borderColor={theme.colors.neutral[800]}
              customStyles={S.secondButton}
              textColor={
                isInCommunityDonationFlow
                  ? theme.colors.neutral[800]
                  : theme.colors.neutral10
              }
              customTextStyles={S.buttonText}
            />
          </View>
        )}
      </View>
      <View style={{ height: "100%" }}>
        {isInCommunityDonationFlow ? (
          <SupportCauseScreen />
        ) : (
          <SupportNonProfitScreen />
        )}
      </View>
    </View>
  );
}
