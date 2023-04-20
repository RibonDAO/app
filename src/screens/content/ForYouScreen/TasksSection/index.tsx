import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import { useCountdown } from "hooks/useCountdown";
import { nextDay } from "lib/dateUtils";
import { useNavigation } from "hooks/useNavigation";
import { useForYouTabsContext } from "contexts/forYouTabsContext";
import { formatCountdown } from "lib/formatters/countdownFormatter";
import { theme } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import S from "./styles";

const CURRENT_PAGE = "ForYouScreen";

export default function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });

  const { tasksState, reload } = useTasksContext();
  const { navigateTo } = useNavigation();
  const { setIndex } = useForYouTabsContext();

  const dailyTasks = useTasks("daily");

  const tasksCount = useCallback(() => {
    if (!tasksState) return;
    if (!tasksState.length) return;

    return dailyTasks.filter((task) => {
      return task.isVisible({ state: tasksState });
    }).length;
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

  return (
    <View style={S.container}>
      <View style={S.paddingContainer}>
        <View style={S.progressBar}>
          <ProgressBar
            value={tasksState.filter((obj) => obj.done === true).length}
            min={0}
            max={tasksCount() || dailyTasks.length}
          />
        </View>
        {renderCountdown()}
        <View style={S.titleContainer}>
          <Icon
            type="outlined"
            name="light_mode"
            size={25}
            color={theme.colors.brand.primary[900]}
          />
          <Text style={S.title}>{t("title")}</Text>
        </View>
        <View>
          {tasksState &&
            dailyTasks.map((task) => {
              const taskDone = tasksState.find(
                (obj) => obj.id === task.id,
              )?.done;
              const navigateToTask = task.navigationCallback;
              const isCurrentPage = navigateToTask === CURRENT_PAGE;
              const navigationCallback = taskDone
                ? undefined
                : isCurrentPage
                ? () => setIndex(1)
                : () => navigateTo(navigateToTask);

              if (!task.isVisible({ state: tasksState })) {
                return null;
              }

              return (
                <CheckBox
                  key={task.id}
                  text={t(`tasks.${task?.title}`)}
                  sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
                  navigationCallback={navigationCallback}
                  checked={taskDone}
                  lineThroughOnChecked
                  disabled
                />
              );
            })}
        </View>
      </View>
    </View>
  );
}
