import { useEffect, useRef, useState } from "react";
import {
  Easing,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Animated,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import S from "./styles";

export type LeftIconProps = {
  color?: string;
  size?: number;
  name: string;
  type: "sharp" | "rounded" | "outlined";
};

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
  leftIcon?: LeftIconProps;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  leftItem?: JSX.Element;
};

const { primary } = theme.colors.brand;

export default function ButtonNonClickable({
  text,
  onPress,
  timeout = null,
  timeoutCallback = () => {},
  backgroundColor = primary[300],
  borderColor = primary[300],
  textColor = primary[900],
  customStyles = {},
  customTextStyles = {},
  leftIcon,
  leftItem,
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
      accessibilityRole="button"
      style={[
        S.container,
        {
          backgroundColor,
          borderColor,
        },
        customStyles,
      ]}
      onPress={handlePress}
      disabled
      onLayout={(e: any) => handleLayout(e)}
      testID={`button-${text}`}
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
      {leftIcon && <Icon {...leftIcon} style={S.leftIcon} />}
      <View style={S.leftItem}>{leftItem && leftItem}</View>
      <Text style={[S.text, { color: textColor }, customTextStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
