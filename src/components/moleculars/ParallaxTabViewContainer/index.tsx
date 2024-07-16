import * as React from "react";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import { Animated } from "react-native";

type Props = {
  routeKey: string;
  children: JSX.Element | JSX.Element[];
};
function ParallaxTabViewContainer({ routeKey, children }: Props) {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);
  const { contentContainerStyle } = scrollPropsAndRef;

  return (
    <Animated.ScrollView
      {...scrollPropsAndRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        ...contentContainerStyle,
        minHeight: 670,
      }}
    >
      {children}
    </Animated.ScrollView>
  );
}

export default ParallaxTabViewContainer;
