import React from "react";
import { Layout, LayoutProps } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ContainerProps extends LayoutProps {
  useSafeArea?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  useSafeArea = true,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Layout
      {...props}
      style={[
        { flex: 1 },
        useSafeArea && { paddingTop: top, paddingBottom: bottom },
        style,
      ]}
    >
      {children}
    </Layout>
  );
};

export default Container;
