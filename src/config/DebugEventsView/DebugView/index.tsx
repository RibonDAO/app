import React from "react";
import { TouchableOpacity, Text, FlatList, View } from "react-native";
import styles from "./styles";

export interface EventLog {
  eventName: string;
  eventParams: any;
  count: number;
}

interface DebugViewProps {
  eventLogs: EventLog[];
  resetLogs: () => void;
}

function DebugView({ eventLogs, resetLogs }: DebugViewProps) {
  const renderItem = ({ item }: { item: EventLog }) => (
    <View style={styles.eventLogItem}>
      <Text style={styles.eventName}>
        {item.eventName} | {item.count}x
      </Text>
      <Text>{JSON.stringify(item.eventParams)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={resetLogs}
        style={styles.resetButton}
      >
        <Text>Reset</Text>
      </TouchableOpacity>
      <FlatList
        data={eventLogs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.eventLogsContainer}
        showsHorizontalScrollIndicator
      />
    </View>
  );
}

export default DebugView;
