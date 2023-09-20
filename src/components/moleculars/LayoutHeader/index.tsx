import { useCurrentUser } from "contexts/currentUserContext";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CogIcon from "components/vectors/CogIcon";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import RoundButton from "components/atomics/RoundButton";
import TicketIcon from "components/vectors/TicketIcon";
import GrayTicketIcon from "components/vectors/GrayTicketIcon";
import { useNavigation } from "hooks/useNavigation";
import { theme } from "@ribon.io/shared/styles";
import { useTickets } from "contexts/ticketsContext";
import Icon from "components/atomics/Icon";
import { useTranslation } from "react-i18next";
import { useWalletContext } from "contexts/walletContext";
import WalletIcon from "components/vectors/WalletIcon";
import { walletTruncate } from "lib/formatters/walletTruncate";
import { openInWebViewer } from "lib/linkOpener";
import { Linking, Platform } from "react-native";
import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { isNotificationsEnabled } from "lib/notifications";
import { useFocusEffect } from "@react-navigation/native";
import { logEvent } from "services/analytics";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import { REACT_APP_ZENDESK_KEY } from "utils/constants/Application";
import ConfigItem from "../ConfigItem";
import TicketModal from "./TicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import DeleteAccountModal from "./DeleteAccountModal";
import S from "./styles";

type Props = {
  hideTicket?: boolean;
  hideWallet?: boolean;
};
function LayoutHeader({
  hideTicket = false,
  hideWallet = true,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layoutHeader",
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { navigateTo } = useNavigation();
  const { currentUser, logoutCurrentUser } = useCurrentUser();
  const { tickets, hasTickets } = useTickets();
  const ticketColor = hasTickets()
    ? theme.colors.brand.primary[600]
    : theme.colors.neutral[500];
  const ticketIcon = hasTickets() ? <TicketIcon /> : <GrayTicketIcon />;
  const { connectWallet, wallet, killSession } = useWalletContext();
  const { userSubscriptions } = useSubscriptions();
  const { subscriptions, refetch: refetchSubscription } = userSubscriptions();

  useEffect(() => {
    if (menuVisible) logEvent("P18_view");
  }, [menuVisible]);

  const handleWalletButtonClick = () => {
    if (wallet) {
      Alert.alert("", t("disconnectWallet") || "", [
        { text: t("cancel") || "", style: "cancel" },
        { text: t("confirm") || "", onPress: () => killSession() },
      ]);
    }
    if (!wallet) connectWallet();
  };
  const toggleModal = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logoutCurrentUser();
    navigateTo("CausesScreen");
    toggleModal();
  };

  const handleOpenSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const toggleDeleteAccountModal = () => {
    toggleModal();

    setTimeout(() => {
      setDeleteAccountModalVisible(!deleteAccountModalVisible);
    }, 800);
  };

  useFocusEffect(
    useCallback(() => {
      isNotificationsEnabled().then((enabled) =>
        setNotificationsEnabled(Boolean(enabled)),
      );
    }, []),
  );

  const renderTicketModal = () => {
    if (hideTicket) return <View />;

    return (
      <TicketModal
        visible={ticketModalVisible}
        setVisible={setTicketModalVisible}
      />
    );
  };

  const renderDeleteAccountModal = () => (
    <DeleteAccountModal
      visible={deleteAccountModalVisible}
      setVisible={setDeleteAccountModalVisible}
    />
  );

  const handleTicketClick = () => {
    if (hasTickets()) {
      navigateTo("GiveTicketScreen");
    } else {
      navigateTo("ZeroTicketScreen");
    }
  };

  const handleMonthlyContributionClick = () => {
    refetchSubscription();

    logEvent("manageSubscription_click", {
      from: "configPage",
    });

    if (!currentUser) return navigateTo("PromotersScreen");

    if (subscriptions && subscriptions?.length > 0) {
      return navigateTo("MonthlyContributionsScreen");
    } else {
      return navigateTo("PromotersScreen");
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetchSubscription();
    }, []),
  );

  const linkToSupport = () => {
    const key = REACT_APP_ZENDESK_KEY;
    openInWebViewer(t("supportLink", { key }));
    logEvent("supportBtn_click", {
      from: "config_page",
      email: currentUser?.email,
    });
  };

  const notificationsSwitch = () => (
    <ButtonSwitch
      leftText=""
      rightText=""
      onSwitch={() => handleOpenSettings()}
      initialCheckState={notificationsEnabled || false}
    />
  );

  const renderLogoutConfigItem = () =>
    currentUser && (
      <ConfigItem
        icon={{
          name: "logout",
          type: "rounded",
          color: theme.colors.brand.primary[600],
          size: 24,
        }}
        text={currentUser.email}
        onPress={handleLogout}
        cta={
          <View style={{ width: 50 }}>
            <RoundButton
              active={false}
              text={t("exitButton")}
              onPress={handleLogout}
            />
          </View>
        }
      />
    );

  const renderDeleteAccountConfigItem = () =>
    currentUser && (
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
    );
  const renderConfigModal = () => (
    <Modal
      isVisible={menuVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      hasBackdrop
      backdropOpacity={0.2}
      onBackdropPress={toggleModal}
    >
      <View style={S.supportContainer}>
        <ConfigItem
          icon={{
            name: "notifications",
            type: "rounded",
            color: theme.colors.brand.primary[600],
            size: 24,
          }}
          text={t("notifications")}
          linkIcon={notificationsSwitch}
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

        {renderLogoutConfigItem()}
        {renderDeleteAccountConfigItem()}
      </View>
    </Modal>
  );

  return (
    <View style={S.configContainer}>
      {!hideTicket && (
        <TouchableOpacity
          accessibilityRole="button"
          style={S.container}
          onPress={handleTicketClick}
        >
          <View style={{ ...S.ticketSection, borderColor: ticketColor }}>
            <Text style={{ ...S.ticketCounter, color: ticketColor }}>
              {tickets}
            </Text>
            {ticketIcon}
          </View>
        </TouchableOpacity>
      )}

      {!hideWallet && (
        <TouchableOpacity
          accessibilityRole="button"
          style={S.container}
          onPress={handleWalletButtonClick}
        >
          <View style={S.walletContainer}>
            <Text style={S.walletText}>
              {wallet ? walletTruncate(wallet) : t("connectWallet")}
            </Text>
            <WalletIcon />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        accessibilityRole="button"
        style={S.container}
        onPress={toggleModal}
      >
        <CogIcon />
      </TouchableOpacity>

      {renderTicketModal()}

      {renderConfigModal()}

      {renderDeleteAccountModal()}
    </View>
  );
}

export default LayoutHeader;
