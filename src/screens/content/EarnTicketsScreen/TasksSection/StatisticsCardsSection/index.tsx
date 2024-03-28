import { View } from "react-native";
import { theme, useTasksStatistics } from "@ribon.io/shared";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import { useCallback, useEffect, useState } from "react";
import ImpactCard from "screens/users/ImpactScreen/ImpactCard";
import { useFocusEffect } from "@react-navigation/native";
import S from "./styles";

export default function StatisticsCardsSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.earnTicketsScreen.tasksSection.statisticsCardsSection",
  });
  const { tasksState, tasksStatistics, reload } = useTasksContext();
  const [dailyTasksCompleted, setDailyTasksCompleted] = useState(0);
  const [superTasksCompleted, setSuperTasksCompleted] = useState(0);
  const [showSuperTasks, setShowSuperTasks] = useState(false);
  const { refetchTasksStatistics } = useTasksStatistics();

  const countDailyTasksCompleted = () => {
    const dailyTasksState = tasksState.filter((task) => task.type === "daily");
    if (!dailyTasksState) return 0;
    return dailyTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  const countSuperTasksCompleted = () => {
    const superTasksState = tasksState.filter(
      (task) => task.type === "monthly",
    );
    if (!superTasksState) return 0;
    return superTasksState.reduce(
      (total, task) => total + task.timesCompleted,
      0,
    );
  };

  useEffect(() => {
    setDailyTasksCompleted(countDailyTasksCompleted());
    setSuperTasksCompleted(countSuperTasksCompleted());
  }, [tasksState, tasksStatistics, refetchTasksStatistics]);

  useFocusEffect(
    useCallback(() => {
      refetchTasksStatistics();
      if (tasksStatistics) {
        if (tasksStatistics?.contributor) setShowSuperTasks(true);
        if (tasksStatistics?.firstCompletedAllTasksAt) setShowSuperTasks(true);
      }
    }, [tasksStatistics, refetchTasksStatistics]),
  );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, []),
  );
  return (
    <View style={S.container}>
      {dailyTasksCompleted > 0 && (
        <ImpactCard
          iconName="clear_day"
          impact={dailyTasksCompleted || 0}
          description={t("dailyTasksTitle")}
        />
      )}
      {showSuperTasks && (
        <ImpactCard
          iconName="bolt"
          impact={superTasksCompleted || 0}
          description={t("superTasksTitle")}
          color={theme.colors.brand.tertiary[900]}
        />
      )}
      {dailyTasksCompleted > 0 && (
        <ImpactCard
          iconName="event_available"
          impact={tasksStatistics?.streak || 0}
          description={t("streakTitle")}
          color={theme.colors.brand.secondary[800]}
        />
      )}
    </View>
  );
}
