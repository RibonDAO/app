import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import { openInWebViewer } from "lib/linkOpener";
import { Linking, Platform } from "react-native";
import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { isNotificationsEnabled } from "lib/notifications";
import { useFocusEffect } from "@react-navigation/native";
import { logEvent } from "services/analytics";
import { useSubscriptions, useUserProfile } from "@ribon.io/shared/hooks";
import { EXPO_PUBLIC_ZENDESK_KEY } from "utils/constants/Application";
import ConfigItem from "components/moleculars/ConfigItem";
import DeleteAccountModal from "components/moleculars/LayoutHeader/modals/DeleteAccountModal";
import LogoutModal from "components/moleculars/LayoutHeader/modals/LogoutModal";
import ProfilePhoto from "assets/icons/ProfilePhoto";
import * as S from "./styles";

function ConfigScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "configScreen",
  });

  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { userSubscriptions, userIsMember } = useSubscriptions();
  const { subscriptions, refetch: refetchSubscription } = userSubscriptions();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const { isMember } = userIsMember();

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const toggleDeleteAccountModal = () => {
    logEvent("deleteAccountBtn_click");
    setDeleteAccountModalVisible(!deleteAccountModalVisible);
  };

  const toggleLogoutModal = () => {
    logEvent("signoutBtn_click");
    setLogoutModalVisible(!logoutModalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      isNotificationsEnabled().then((enabled) =>
        setNotificationsEnabled(Boolean(enabled)),
      );
    }, []),
  );

  const handleMonthlyContributionClick = () => {
    refetchSubscription();

    logEvent("manageSubs_click", {
      from: "configPage",
    });

    if (!currentUser) return navigateTo("ClubScreen");

    if (subscriptions && subscriptions?.length > 0) {
      return navigateTo("SubscriptionsScreen");
    } else {
      return navigateTo("ClubScreen");
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetchSubscription();
    }, []),
  );

  const linkToSupport = () => {
    const key = EXPO_PUBLIC_ZENDESK_KEY;
    openInWebViewer(t("support.link", { key }));
    logEvent("supportBtn_click", {
      from: "config_page",
    });
  };

  const notificationsSwitchButton = () => (
    <ButtonSwitch
      leftText=""
      rightText=""
      onSwitch={() => handleOpenSettings()}
      initialCheckState={notificationsEnabled || false}
    />
  );

  const linkToLanguages = () => {
    navigateTo("ChangeLanguageScreen");
  };

  const guestHeader = useMemo(() => (
      <S.Header>
        <ProfilePhoto />
        <S.ProfileInfo>
          <S.ProfileEmail>{t("header.guestUser")}</S.ProfileEmail>
          <S.LoginButton onPress={() => navigateTo("SignInScreen")}>
            <S.ButtonText>{t("header.signIn")}</S.ButtonText>
          </S.LoginButton>
        </S.ProfileInfo>
      </S.Header>
    ), []);

  const userHeader = useMemo(() => (
      <S.Header>
        {profile?.photo ? (
          <S.ProfilePicture source={{ uri: profile.photo }} />
        ) : (
          <ProfilePhoto />
        )}

        <S.ProfileInfo>
          <S.ProfileEmail>{currentUser?.email}</S.ProfileEmail>
          <S.TagContainer>
            <S.ClubTag member={isMember}>
              <S.TagText member={isMember}>
                {isMember ? t("header.clubTagText") : t("header.noClubTagText")}
              </S.TagText>
            </S.ClubTag>
          </S.TagContainer>
        </S.ProfileInfo>
      </S.Header>
    ), [profile, currentUser]);

  return (
    <S.Container>
      {currentUser ? userHeader : guestHeader}
      <S.ConfigGroup>
        <S.ConfigGroupTitle>{t("generalSettings.title")}</S.ConfigGroupTitle>
        <S.ConfigGroupList>
          <ConfigItem
            icon={{
              name: "notifications",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("generalSettings.notifications")}
            linkIcon={notificationsSwitchButton}
          />
          <ConfigItem
            icon={{
              name: "language",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("generalSettings.language")}
            onPress={linkToLanguages}
            cta={
              <Icon
                type="rounded"
                size={20}
                color={theme.colors.brand.primary[600]}
                name="arrow_forward_ios"
                onPress={linkToLanguages}
              />
            }
            last
          />
        </S.ConfigGroupList>
      </S.ConfigGroup>
      <S.ConfigGroup>
        <S.ConfigGroupTitle>{t("support.title")}</S.ConfigGroupTitle>
        <S.ConfigGroupList>
          <ConfigItem
            icon={{
              name: "support_agent",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("support.talkToUs")}
            onPress={linkToSupport}
            cta={
              <Icon
                type="rounded"
                size={20}
                color={theme.colors.brand.primary[600]}
                name="arrow_forward_ios"
                onPress={linkToSupport}
              />
            }
            last
          />
        </S.ConfigGroupList>
      </S.ConfigGroup>
      <S.ConfigGroup>
        <S.ConfigGroupTitle>{t("subscriptions.title")}</S.ConfigGroupTitle>
        <S.ConfigGroupList>
          <ConfigItem
            icon={{
              name: "volunteer_activism",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("subscriptions.ribonClub")}
            onPress={handleMonthlyContributionClick}
            cta={
              <Icon
                type="rounded"
                size={20}
                color={theme.colors.brand.primary[600]}
                name="arrow_forward_ios"
                onPress={handleMonthlyContributionClick}
              />
            }
            last
          />
        </S.ConfigGroupList>
      </S.ConfigGroup>

      <S.ConfigGroup>
        <S.ConfigGroupTitle>{t("account.title")}</S.ConfigGroupTitle>
        <S.ConfigGroupList>
          {currentUser ? (
            <>
              <ConfigItem
                icon={{
                  name: "logout",
                  type: "rounded",
                  color: theme.colors.brand.primary[600],
                  size: 24,
                }}
                text={t("account.logout")}
                onPress={toggleLogoutModal}
                cta={
                  <Icon
                    type="rounded"
                    size={20}
                    color={theme.colors.brand.primary[600]}
                    name="arrow_forward_ios"
                    onPress={toggleLogoutModal}
                  />
                }
              />
              <ConfigItem
                icon={{
                  name: "delete_forever",
                  type: "rounded",
                  color: theme.colors.brand.tertiary[400],
                  size: 24,
                }}
                text={t("account.deleteAccount")}
                onPress={toggleDeleteAccountModal}
                cta={
                  <Icon
                    type="rounded"
                    size={20}
                    color={theme.colors.brand.tertiary[400]}
                    name="arrow_forward_ios"
                  />
                }
                last
              />
            </>
          ) : (
            <ConfigItem
              icon={{
                name: "account_circle",
                type: "rounded",
                color: theme.colors.brand.primary[600],
                size: 24,
              }}
              text={t("account.signIn")}
              onPress={() => navigateTo("SignInScreen")}
              cta={
                <Icon
                  type="rounded"
                  size={20}
                  color={theme.colors.brand.primary[600]}
                  name="arrow_forward_ios"
                  onPress={() => navigateTo("SignInScreen")}
                />
              }
              last
            />
          )}
        </S.ConfigGroupList>
      </S.ConfigGroup>
      <S.Footer />

      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        setVisible={setDeleteAccountModalVisible}
      />
      <LogoutModal
        visible={logoutModalVisible}
        setVisible={setLogoutModalVisible}
      />
    </S.Container>
  );
}

export default ConfigScreen;
