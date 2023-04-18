import { Text, View } from "react-native";
import { TASKS, useTasks } from "utils/constants/Tasks";
import CheckBox from "components/atomics/inputs/Checkbox";
import Icon from "components/atomics/Icon";
import { theme, useIntegration } from "@ribon.io/shared";
import ProgressBar from "components/atomics/ProgressBar";
import { useTranslation } from "react-i18next";
import { useTasksContext } from "contexts/tasksContext";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import Image from "components/atomics/Image";
import { openInWebViewer } from "lib/linkOpener";
import S from "./styles";

export default function TasksSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.forYouScreen.tasksSection",
  });
  const dailyTasks = useTasks("daily");

  const { tasksState } = useTasksContext();

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );

  const { integration } = useIntegration(1);

  const linkToTerms = () => {
    openInWebViewer(integration?.integrationTask.linkAddress ?? "");
  };

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
              lineThroughOnChecked
              navigationCallback={
                !task.done ? currentTask?.navigationCallback : undefined
              }
              disabled
              checked={task.done}
            />
          );
        })}
        {integration?.integrationTask.description &&
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
                <Text style={S.integrationLink} onPress={linkToTerms}>
                  {integration?.integrationTask.link}
                </Text>
              </View>
            </View>
          )}
      </View>
    </View>
  );
}
