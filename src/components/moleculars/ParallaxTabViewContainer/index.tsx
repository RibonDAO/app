import * as React from "react";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { Animated } from "react-native";

const ParallaxTabViewContainer: React.FC<{
  routeKey: string;
  children: JSX.Element;
}> = ({ routeKey, children }) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView {...scrollPropsAndRef}>{children}</Animated.ScrollView>
  );
};

export default ParallaxTabViewContainer;
