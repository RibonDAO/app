import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";

import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";

import { useNavigation } from "hooks/useNavigation";
import { useForYouTabsContext } from "contexts/forYouTabsContext";

import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import S from "./styles";

export default function DailyTasksSection() {
  const CURRENT_PAGE = "ForYouScreen";

  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const dailyTasks = useTasks("daily");
  const { tasksState, reload } = useTasksContext();
  const { navigateTo } = useNavigation();

  const { setIndex } = useForYouTabsContext();

  const isTaskDone = useCallback(
    (task: any) => tasksState?.find((obj) => obj.id === task.id)?.done,
    [tasksState],
  );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, []),
  );

  return (
    <View style={S.container}>
      <View style={S.titleContainer}>
        <Icon
          type="outlined"
          name="light_mode"
          size={25}
          color={theme.colors.brand.primary[900]}
        />
        <Text style={S.title}>{t("title")}</Text>
      </View>

      {tasksState &&
        dailyTasks.map((task) => {
          const taskDone = isTaskDone(task);
          const navigateToTask = task.navigationCallback;
          const isCurrentPage = navigateToTask === CURRENT_PAGE;
          const callback = isCurrentPage
            ? () => setIndex(1)
            : () => navigateTo(navigateToTask);
          const navigationCallback = taskDone ? undefined : callback;

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
  );
}
