/* eslint-disable react/jsx-no-useless-fragment */
import { useIntegrationContext } from "contexts/integrationContext";
import { useTasksContext } from "contexts/tasksContext";
import { openInWebViewer } from "lib/linkOpener";
import { View, Image, Text } from "react-native";
import { useTasks } from "utils/constants/Tasks";
import S from "./styles";

export default function IntegrationTasksSection() {
  const dailyTasks = useTasks("daily");
  const { tasksState } = useTasksContext();

  const { integration } = useIntegrationContext();

  const linkToIntegration = () => {
    openInWebViewer(integration?.integrationTask?.linkAddress ?? "");
  };

  const donateTicketTask = dailyTasks.find(
    (obj) => obj.title === "donate_ticket",
  );
  return (
    <>
      {tasksState.find((obj) => obj.id === donateTicketTask?.id)?.done && (
        <View style={S.integrationContainer}>
          <View style={S.integrationLeftSection}>
            <View style={S.integrationIconContainer}>
              <Image
                style={S.integrationIcon}
                source={{ uri: integration?.logo ?? "" }}
                accessibilityIgnoresInvertColors={false}
              />
            </View>
          </View>
          <View style={S.integrationRightSection}>
            <Text style={S.integrationTitle}>
              {integration?.integrationTask?.description}
            </Text>
            <Text style={S.integrationLink} onPress={linkToIntegration}>
              {integration?.integrationTask?.link}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
