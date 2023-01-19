import React, { useEffect, useRef, useState } from "react";
import {
  Easing,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "components/Themed";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  timeout?: number | null;
  timeoutCallback?: () => void;
  outline?: boolean;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
  textColorOutline?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
};

export default function Button({
  text,
  onPress,
  disabled = false,
  timeout = null,
  timeoutCallback = () => {},
  outline,
  backgroundColor = theme.colors.green30,
  backgroundColorOutline = theme.colors.neutral10,
  borderColor = theme.colors.green30,
  borderColorOutline = theme.colors.green30,
  textColorOutline = theme.colors.green30,
  textColor = theme.colors.neutral10,
  customStyles = {},
  customTextStyles = {},
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

  function backgroundColorByState() {
    if (disabled) return theme.colors.gray20;
    if (outline) return backgroundColorOutline;

    return backgroundColor;
  }

  function borderColorByState() {
    if (disabled) return theme.colors.gray20;
    if (outline) return borderColorOutline;

    return borderColor;
  }

  function textColorByState() {
    if (disabled) return theme.colors.gray30;
    if (outline) return textColorOutline;

    return textColor;
  }

  return (
    <TouchableOpacity
      style={[
        S.container,
        {
          backgroundColor: backgroundColorByState(),
          borderColor: borderColorByState(),
        },
        customStyles,
      ]}
      onPress={handlePress}
      disabled={disabled}
      onLayout={(e: any) => handleLayout(e)}
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
      <Text style={[S.text, { color: textColorByState() }, customTextStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
