import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DebugView, { EventLog } from "./DebugView";
import S from "./styles";

// eslint-disable-next-line import/no-mutable-exports
export let logDebugEvent: any = () => {};
function DebugEventsView() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [minimized, setMinimized] = useState(false);

  function update(eventName: string, eventParams: any) {
    setEventLogs((prevEventLogs) => {
      const existingEventLog = prevEventLogs.find(
        (log) =>
          log.eventName === eventName &&
          JSON.stringify(log.eventParams) === JSON.stringify(eventParams),
      );
      if (existingEventLog) {
        const updatedEventLog = {
          ...existingEventLog,
          count: existingEventLog.count + 1,
        };
        return prevEventLogs.map((log) =>
          log.eventName === eventName &&
          JSON.stringify(log.eventParams) === JSON.stringify(eventParams)
            ? updatedEventLog
            : log,
        );
      } else {
        const newEventLog: EventLog = {
          eventName,
          eventParams,
          count: 1,
        };
        return [newEventLog, ...prevEventLogs];
      }
    });
  }

  useEffect(() => {
    /* Assign update to outside variable */
    logDebugEvent = update;

    /* Unassign when component unmounts */
    return () => {
      logDebugEvent = null;
    };
  }, []);

  const resetLogs = () => {
    setEventLogs([]);
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  if (minimized) {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        onPress={handleMinimize}
        style={S.minimizedContainer}
      >
        <Text style={S.minimizedText}>Debug View</Text>
        <Text style={S.minusButton}>+</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={S.container}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={handleMinimize}
        style={S.minimizeButton}
      >
        <Text>Minimize</Text>
      </TouchableOpacity>
      <DebugView eventLogs={eventLogs} resetLogs={resetLogs} />
    </View>
  );
}

export default DebugEventsView;
