import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";

import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";

import { useNavigation } from "hooks/useNavigation";
import { useForYouTabsContext } from "contexts/forYouTabsContext";

import Tag from "components/atomics/Tag";
import { beginningOfToday } from "lib/dateUtils";
import S from "./styles";

export default function MonthlyTasksSection() {
  const CURRENT_PAGE = "ForYouScreen";

  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const monthlyTasks = useTasks("monthly");
  const { tasksState, tasksStatistics } = useTasksContext();
  const { navigateTo } = useNavigation();

  const { setIndex } = useForYouTabsContext();

  const showTagNew = () => {
    if (
      new Date(tasksStatistics?.firstCompletedAllTasksAt ?? "") <
      beginningOfToday()
    )
      return true;

    return false;
  };

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
  );
}
