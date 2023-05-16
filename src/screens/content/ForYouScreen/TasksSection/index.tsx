import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import { useIntegration, useTasksStatistics } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import Image from "components/atomics/Image";
import { openInWebViewer } from "lib/linkOpener";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";

import { useForYouTabsContext } from "contexts/forYouTabsContext";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { useFocusEffect } from "@react-navigation/native";

import { useCallback, useEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import requestUserPermissionForNotifications from "lib/notifications";
import { showToast } from "lib/Toast";
import { logError } from "services/crashReport";
import InlineNotification from "components/moleculars/notifications/InlineNotification";
import StatisticsCardsSection from "./StatisticsCardsSection";
import DailyTasksSection from "./DailyTasksSection";
import MonthlyTasksSection from "./MonthlyTasksSection";
import S from "./styles";

const NOTIFICATION_CARD_VISIBLE_KEY = "NOTIFICATION_CARD_VISIBLE";

export default function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const dailyTasks = useTasks("daily");
  const {
    tasksState,
    reload,
    setHasCompletedATask,
    hasCompletedATask,
    tasksStatistics,
  } = useTasksContext();
  const { refetchTasksStatistics } = useTasksStatistics();
  const [showMonthlyTasks, setShowMonthlyTasks] = useState<boolean>();
  const [isNotificationCardVisible, setNotificationCardVisible] =
    useState(false);

  const { index } = useForYouTabsContext();

  useFocusEffect(
    useCallback(() => {
      if (hasCompletedATask === true && index === 0) {
        setHasCompletedATask(false);
      }
    }, [hasCompletedATask, index, setHasCompletedATask]),
  );

  useEffect(() => {
    const notificationCardVisible = async () => {
      const value = await getLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY);
      return value === "true" || value === null;
    };

    notificationCardVisible().then((visible) => {
      setNotificationCardVisible(visible);
    });
  }, []);

  const tasksCount = useCallback(() => {
    if (!tasksState) return 0;
    if (!tasksState.length) return 0;

    return dailyTasks.filter((task) => task.isVisible({ state: tasksState }))
      .length;
  }, [tasksState]);

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  const progressBarValue = () => {
    const tasks = dailyTasks.map((visibleTask: any) => {
      const completedTasks = tasksState.find(
        (completedTask: any) => completedTask.id === visibleTask.id,
      );
      return { ...visibleTask, ...completedTasks };
    });
    return tasks.filter(
      (task: any) => task.done && task.isVisible({ state: tasksState }),
    );
  };

  useFocusEffect(
    useCallback(() => {
      refetchTasksStatistics();
      if (tasksStatistics) {
        if (tasksStatistics?.contributor) setShowMonthlyTasks(true);
        if (tasksStatistics?.firstCompletedAllTasksAt)
          setShowMonthlyTasks(true);
      }
    }, [tasksStatistics, refetchTasksStatistics, setShowMonthlyTasks]),
  );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, []),
  );

  const { integration } = useIntegration(RIBON_INTEGRATION_ID);

  const linkToIntegration = () => {
    openInWebViewer(integration?.integrationTask?.linkAddress ?? "");
  };

  const handleHideNotificationClick = async () => {
    const hideAlert = () => {
      setLocalStorageItem(NOTIFICATION_CARD_VISIBLE_KEY, "false");
      setNotificationCardVisible(false);
    };

    try {
      const enabled = await requestUserPermissionForNotifications();
      if (enabled) {
        showToast({
          type: "success",
          message: t("enableNotification.successToastMessage"),
          position: "bottom",
        });
        hideAlert();
      }
    } catch (e) {
      logError(e);
      showToast({
        type: "error",
        message: t("enableNotification.errorToastMessage"),
        position: "bottom",
      });
      hideAlert();
    }
  };

  const renderNotificationCard = () =>
    isNotificationCardVisible && (
      <View style={{ paddingBottom: 16 }}>
        <InlineNotification
          title={t("enableNotification.title")}
          type="warning"
          customIcon="notifications"
          firstLink={t("enableNotification.link") || ""}
          onFirstLinkClick={handleHideNotificationClick}
        />
      </View>
    );

  function renderCountdown() {
    const countdown = useCountdown(nextDay(), reload);

    if (
      !tasksState ||
      !tasksState.length ||
      tasksState.filter((obj) => obj.type === "daily" && obj.done === false)
        .length ||
      countdown.reduce((a, b) => a + b, 0) <= 0
    ) {
      return null;
    }

    return (
      <View>
        <View style={S.timerWrapper}>
          <Text style={S.countdown}>{formatCountdown(countdown)}</Text>
          <Text>{t("countdown")}</Text>
        </View>

        {renderNotificationCard()}
      </View>
    );
  }

  return (
    <View style={S.container}>
      <View style={S.paddingContainer}>
        <View style={S.progressBar}>
          <ProgressBar
            value={progressBarValue().length}
            min={0}
            max={tasksCount() || dailyTasks.length}
          />
        </View>
        {renderCountdown()}
        <DailyTasksSection />
        {showMonthlyTasks && <MonthlyTasksSection />}

        {integration?.integrationTask &&
          tasksState.find((obj) => obj.id === donateTicketTask?.id)?.done && (
            <View style={S.integrationContainer}>
              <View style={S.integrationLeftSection}>
                <View style={S.integrationIconContainer}>
                  <Image
                    style={S.integrationIcon}
                    source={{ uri: integration?.logo ?? "" }}
                  />
                </View>
              </View>
              <View style={S.integrationRightSection}>
                <Text style={S.integrationTitle}>
                  {integration?.integrationTask.description}
                </Text>
                <Text style={S.integrationLink} onPress={linkToIntegration}>
                  {integration?.integrationTask.link}
                </Text>
              </View>
            </View>
          )}
      </View>
      <StatisticsCardsSection />
    </View>
  );
}
