import * as React from "react";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { Animated } from "react-native";

const ParallaxTabViewContainer: React.FC<{
  routeKey: string;
  children: JSX.Element;
}> = ({ routeKey, children }) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);
  const {contentContainerStyle } = scrollPropsAndRef;

  return (
    <Animated.ScrollView
      {...scrollPropsAndRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        ...contentContainerStyle,
        minHeight: 670
      }}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default ParallaxTabViewContainer;
