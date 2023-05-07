import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import { useIntegration } from "@ribon.io/shared";
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

import { useCallback } from "react";

import S from "./styles";
import MonthlyTasksSection from "./MonthlyTasksSection";
import DailyTasksSection from "./DailyTasksSection";

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

  const { index } = useForYouTabsContext();

  useFocusEffect(
    useCallback(() => {
      if (hasCompletedATask === true && index === 0) {
        setHasCompletedATask(false);
      }
    }, [hasCompletedATask, index, setHasCompletedATask]),
  );

  const tasksCount = useCallback(() => {
    if (!tasksState) return 0;
    if (!tasksState.length) return 0;

    return dailyTasks.filter((task) => task.isVisible({ state: tasksState }))
      .length;
  }, [tasksState]);

  const renderCountdown = () => {
    const countdown = useCountdown(nextDay(), reload);

    if (!tasksState) return;
    if (!tasksState.length) return;
    if (tasksState.filter((obj) => obj.done === false).length) return;
    if (countdown.reduce((a, b) => a + b, 0) <= 0) return;

    return (
      <View style={S.timerWrapper}>
        <Text style={S.countdown}>{formatCountdown(countdown)}</Text>
        <Text>{t("countdown")}</Text>
      </View>
    );
  };

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

  const showMonthlyTasks = useCallback(() => {
    if (!tasksStatistics) return false;
    if (tasksStatistics.hasContribution) {
      registerAction("contribution_done_screen_view");
      return true;
    }

    if (tasksStatistics.firstCompletedAllTasksAt) return true;

    return false;
  }, [tasksStatistics]);

  const { integration } = useIntegration(RIBON_INTEGRATION_ID);

  const linkToIntegration = () => {
    openInWebViewer(integration?.integrationTask.linkAddress ?? "");
  };

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
        {showMonthlyTasks() && <MonthlyTasksSection />}

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
    </View>
  );
}
