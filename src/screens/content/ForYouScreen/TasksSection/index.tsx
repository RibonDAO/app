import { View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import { useTasksStatistics } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import { useTasksContext } from "contexts/tasksContext";
import { useForYouTabsContext } from "contexts/forYouTabsContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useIntegrationContext } from "contexts/integrationContext";
import StatisticsCardsSection from "./StatisticsCardsSection";
import DailyTasksSection from "./DailyTasksSection";
import MonthlyTasksSection from "./MonthlyTasksSection";
import S from "./styles";
import CountdownSection from "./CountdownSection";
import IntegrationTasksSection from "./IntegrationTasksSection";

export default function TasksSection() {
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

  useEffect(() => {
    if (index === 0) {
      reload();
    }
  }, [index]);

  const { integration } = useIntegrationContext();

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

        <CountdownSection />
        <DailyTasksSection />
        {showMonthlyTasks && <MonthlyTasksSection />}

        {integration?.integrationTask && <IntegrationTasksSection />}
      </View>
      <StatisticsCardsSection />
    </View>
  );
}
