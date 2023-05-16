import { Text, View } from "react-native";
import { TASKS, useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";

import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";

import { useNavigation } from "hooks/useNavigation";

import Tag from "components/atomics/Tag";
import { beginningOfToday } from "lib/dateUtils";
import { useEffect } from "react";
import S from "./styles";

export default function MonthlyTasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const monthlyTasks = useTasks("monthly");
  const { tasksState, tasksStatistics, finishTask } = useTasksContext();
  const { navigateTo } = useNavigation();

  const showTagNew = () =>
    !(
      new Date(tasksStatistics?.firstCompletedAllTasksAt ?? "") <
      beginningOfToday()
    );

  useEffect(() => {
    const taskContribution = TASKS.filter(
      (task: any) => task.title === "make_contribution",
    )[0];

    const taskStatus = tasksState?.find(
      (task) => task.id === taskContribution.id,
    );
    if (
      tasksStatistics?.contributor &&
      !taskStatus?.done &&
      taskStatus?.timesCompleted === 0
    ) {
      finishTask("make_contribution");
    }
  }, []);

  return (
    <View style={S.container}>
      <View style={S.titleContainer}>
        <View style={S.wrapper}>
          <Icon
            type="outlined"
            name="bolt"
            size={25}
            color={theme.colors.brand.primary[900]}
          />
          <Text style={S.title}>{t("titleSuperTasks")}</Text>
        </View>
        {showTagNew() && (
          <Tag
            text="New"
            textColor={theme.colors.brand.primary[900]}
            backgroundColor={theme.colors.brand.primary[50]}
          />
        )}
      </View>

      {tasksState &&
        monthlyTasks.map((task) => {
          const taskDone = tasksState.find((obj) => obj.id === task.id)?.done;
          const navigateToTask = task.navigationCallback;
          const navigationCallback = taskDone
            ? undefined
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
  );
}
