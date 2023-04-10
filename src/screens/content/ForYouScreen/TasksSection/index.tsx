import { Text, View } from "react-native";
import { TASKS, useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import S from "./styles";

export default function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();

  return (
    <View style={S.container}>
      <View style={S.paddingContainer}>
        <View style={S.progressBar}>
          <ProgressBar
            value={tasksState.filter((obj) => obj.done === true).length}
            min={0}
            max={dailyTasks.length}
          />
        </View>
        <View style={S.titleContainer}>
          <Icon
            type="outlined"
            name="light_mode"
            size={25}
            color={theme.colors.brand.primary[900]}
          />
          <Text style={S.title}>{t("title")}</Text>
        </View>
        {tasksState.map((task) => {
          const currentTask = TASKS.find((t) => t.id === task.id);

          return (
            <CheckBox
              key={task.id}
              text={t(`tasks.${currentTask?.title}`)}
              sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
              lineThroughOnChecked={true}
              navigationCallback={
                !task.done ? currentTask?.navigationCallback : undefined
              }
              disabled={true}
              checked={task.done}
            />
          );
        })}
      </View>
    </View>
  );
}
