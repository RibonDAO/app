import React, { useEffect, useRef, useState } from "react";
import { Easing, TouchableOpacity } from "react-native";
import { Animated, StyleSheet, View, Text } from "react-native";
import S from "./styles";

export type Props = {
  text: string;
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
  timeout?: number | null;
  timeoutCallback?: () => void;
};

export default function RoundButton({
  text,
  onPress,
  disabled = false,
  active = true,
  timeout = null,
  timeoutCallback = () => {},
}: Props): JSX.Element {
  const counter = useRef(new Animated.Value(0)).current;
  const [running, setRunning] = useState(false);
  const mounted = useRef(false);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = (count: number) => {
    Animated.timing(counter, {
      toValue: count,
      duration: Number(timeout),
      useNativeDriver: true,
      easing: Easing.bezier(1, 0.01, 0.71, 1.02),
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: [0, containerDimensions.width],
    extrapolate: "clamp",
  });

  const styles = StyleSheet.create({
    progressBar: {
      width: "100%",
      height: "100%",
      position: "absolute",
      overflow: "hidden",
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },
  });

  const handlePress = () => {
    onPress();

    if (!timeout) {
      timeoutCallback();
      return;
    }

    load(100);
    setRunning(true);

    setTimeout(() => {
      timeoutCallback();
    }, timeout);

    setTimeout(() => {
      if (mounted.current) {
        setRunning(false);
        load(0);
      }
    }, timeout + 500);
  };

  const handleLayout = (e: any) => {
    setContainerDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  return (
    <TouchableOpacity
      style={active ? S.containerGreen : S.container}
      onPress={handlePress}
      disabled={disabled}
      onLayout={(e: any) => handleLayout(e)}
      accessibilityRole="button"
    >
      <View style={styles.progressBar}>
        <Animated.View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            height: "100%",
            width: "100%",
            left: -containerDimensions.width,
            opacity: running ? 0.5 : 0,
            transform: [{ translateX: running ? width : 0 }],
          }}
        />
      </View>
      <Text style={active ? S.textGreen : S.text}>{text}</Text>
    </TouchableOpacity>
  );
}
