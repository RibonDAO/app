import { Text, View } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import S from "./styles";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";

export default function TasksSection() {
  const dailyTasks = useTasks("daily");
  const superTasks = useTasks("super_task");
  return (
    <View style={S.container}>
      <View style={S.paddingContainer}>
        <View style={S.progressBar}>
          <ProgressBar value={1} min={0} max={dailyTasks.length} />
        </View>
        <View style={S.timerWrapper}></View>
        <View style={S.titleContainer}>
          <Icon
            type="outlined"
            name="light_mode"
            size={25}
            color={theme.colors.brand.primary[900]}
          />
          <Text style={S.title}>Tarefas</Text>
        </View>
        {dailyTasks.map((task) => (
          <CheckBox
            text={task.title}
            sectionStyle={{ marginBottom: 8, paddingLeft: 4 }}
            lineThroughOnChecked={true}
            navigationCallback={task?.navigationCallback}
          />
        ))}
      </View>
    </View>
  );
}
