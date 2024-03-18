import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
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
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { EXPO_PUBLIC_ZENDESK_KEY } from "utils/constants/Application";
import ConfigItem from "../../ConfigItem";
import ChangeLanguageItem from "./ChangeLanguageItem";

import S from "./styles";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import LogoutModal from "../modals/LogoutModal";

type Props = {
  toggleModal: () => void;
  menuVisible: boolean;
};
function ConfigMenu({ toggleModal, menuVisible }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader",
  });

  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { userSubscriptions } = useSubscriptions();
  const { subscriptions, refetch: refetchSubscription } = userSubscriptions();

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const toggleDeleteAccountModal = () => {
    toggleModal();
    logEvent("deleteAccountBtn_click");

    setTimeout(() => {
      setDeleteAccountModalVisible(!deleteAccountModalVisible);
    }, 800);
  };

  const toggleLogoutModal = () => {
    toggleModal();
    logEvent("signoutBtn_click");

    setTimeout(() => {
      setLogoutModalVisible(!logoutModalVisible);
    }, 800);
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
      return navigateTo("MonthlyContributionsScreen");
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
    openInWebViewer(t("supportLink", { key }));
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

  return (
    <>
      <Modal
        isVisible={menuVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        hasBackdrop
        backdropOpacity={0.2}
        onBackdropPress={toggleModal}
      >
        <View style={S.supportContainer}>
          {!currentUser && (
            <ConfigItem
              icon={{
                name: "account_circle",
                type: "rounded",
                color: theme.colors.brand.primary[600],
                size: 24,
              }}
              text={t("signInOrCreateAccount")}
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
            />
          )}
          <ConfigItem
            icon={{
              name: "notifications",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("notifications")}
            linkIcon={notificationsSwitchButton}
          />

          <ConfigItem
            icon={{
              name: "language",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("language")}
            linkIcon={ChangeLanguageItem}
          />

          <ConfigItem
            icon={{
              name: "volunteer_activism",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("monthlyContributions")}
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
          />

          <ConfigItem
            icon={{
              name: "support_agent",
              type: "rounded",
              color: theme.colors.brand.primary[600],
              size: 24,
            }}
            text={t("support")}
            onPress={linkToSupport}
            last={!currentUser}
            cta={
              <Icon
                type="rounded"
                size={20}
                color={theme.colors.brand.primary[600]}
                name="arrow_forward_ios"
                onPress={linkToSupport}
              />
            }
          />

          {currentUser && (
            <>
              <ConfigItem
                icon={{
                  name: "logout",
                  type: "rounded",
                  color: theme.colors.brand.primary[600],
                  size: 24,
                }}
                text={t("logout")}
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
                text={t("deleteAccount")}
                onPress={toggleDeleteAccountModal}
                last={Boolean(currentUser)}
                cta={
                  <Icon
                    type="rounded"
                    size={20}
                    color={theme.colors.brand.tertiary[400]}
                    name="arrow_forward_ios"
                  />
                }
              />
            </>
          )}
        </View>
      </Modal>
      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        setVisible={setDeleteAccountModalVisible}
      />
      <LogoutModal
        visible={logoutModalVisible}
        setVisible={setLogoutModalVisible}
      />
    </>
  );
}

export default ConfigMenu;
