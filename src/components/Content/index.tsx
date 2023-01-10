import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useTheme } from "@ui-kitten/components";

interface ContentProps extends ScrollViewProps {
  padder?: boolean;
  level?: "1" | "2" | "3" | "4";
}

const Content: React.FC<ContentProps> = ({
  style,
  contentContainerStyle,
  children,
  padder,
  level,
  ...props
}) => {
  const theme = useTheme();
  return (
    <ScrollView
      {...props}
      style={[
        padder && { paddingHorizontal: 32 },
        { backgroundColor: theme[`background-basic-color-${level}`] },
        style,
      ]}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  );
};

export default Content;
