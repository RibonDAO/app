import React, { useEffect, useRef, useState } from "react";
import { Easing } from "react-native";
import { Animated, StyleSheet, View } from "react-native";
import * as S from "./styles";

export type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  timeout?: number | null;
  timeoutCallback?: () => void;
};

export default function Button({
  text,
  onPress,
  disabled = false,
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
    <S.Container
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
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}
