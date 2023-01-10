import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
} from "react-native-reanimated";
import { useTheme, Layout } from "@ui-kitten/components";

interface ProgressBarProps {
  style?: StyleProp<ViewStyle>;
  didDone: number;
  total: number;
  styleBar?: StyleProp<ViewStyle>;
  progressColor?: string;
  containColor?: string;
}

const ProgressBar = ({
  style,
  didDone,
  total,
  styleBar,
  progressColor,
  containColor,
}: ProgressBarProps) => {
  const theme = useTheme();
  const [width, setWidth] = React.useState<number>(1);

  const progress = didDone / total;

  const progressValue = React.useMemo(() => {
    return progress * width;
  }, [width, progress]);

  const slider = useDerivedValue(() => {
    return progress * width;
  });

  const styleSlider = useAnimatedStyle(() => {
    return {
      width: withTiming(slider.value, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const onLayout = React.useCallback(({ nativeEvent }) => {
    setWidth((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  return (
    <Layout
      level="2"
      style={[
        styles.container,

        style,
        {
          backgroundColor: containColor
            ? containColor
            : theme["background-basic-color-1"],
        },
      ]}
      onLayout={onLayout}
    >
      <Animated.View
        style={[
          {
            height: 4,
            backgroundColor: progressColor
              ? progressColor
              : theme["color-primary-100"],
            width: progressValue,
            borderRadius: 4,
          },
          styleBar,
          styleSlider,
        ]}
      />
    </Layout>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 4,
    flexDirection: "row",
    overflow: "hidden",
  },
});
