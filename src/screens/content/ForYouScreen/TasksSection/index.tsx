import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import { useTranslation } from "react-i18next";
import S from "./styles";

export default function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });

  const dailyTasks = useTasks("daily");
  // const superTasks = useTasks("super_task");

  return (
    <View style={S.container}>
      <View style={S.paddingContainer}>
        <View style={S.progressBar}>
          <ProgressBar value={1} min={0} max={dailyTasks.length} />
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
        {dailyTasks.map((task) => (
          <CheckBox
            text={t(`tasks.${task.title}`)}
            sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
            lineThroughOnChecked={true}
            navigationCallback={task?.navigationCallback}
          />
        ))}
      </View>
    </View>
  );
}
