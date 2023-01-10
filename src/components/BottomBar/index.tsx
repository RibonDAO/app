import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

const BottomBar = memo(() => {
  const { bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      style={[styles.container, { paddingBottom: bottom + 40 }]}
      level="2"
    >
      <Button
        activeOpacity={0.7}
        status="transparent"
        accessoryRight={<Icon pack="assets" name="calendar" />}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={require("../../assets/images/icon.png")}
          /* @ts-ignore */
          style={styles.logo}
        />
      </TouchableOpacity>
      <Button
        activeOpacity={0.7}
        status="transparent"
        accessoryRight={() => (
          <Icon pack="assets" name="user" style={styles.iconUser} />
        )}
      />
    </Layout>
  );
});

export default BottomBar;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  logo: {
    height: 20,
    width: 24,
    marginTop: 8,
  },
  iconUser: {
    tintColor: "color-primary-100",
    height: 20,
    width: 20,
  },
});
