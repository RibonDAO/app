import React, { memo } from "react";
import {
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
  Layout,
} from "@ui-kitten/components";
import useLayout from "../hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import ProgressBar from "components/ProgressBar";
import BottomBar from "components/BottomBar";

const Profile10 = memo(() => {
  const { height, width, top } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const DATA_Achieve = [
    {
      id: 0,
      color: theme["color-radical-600"],
    },
    {
      id: 1,
      color: theme["color-emerald-100"],
    },
    {
      id: 2,
      color: theme["color-salmon-100"],
    },
    {
      id: 3,
      color: theme["color-patrick-blue-100"],
    },
  ];

  const [data, setData] = React.useState(DATA_Achieve);
  const frame01 = require("../assets/images/image_frame01.png");

  return (
    <Container style={[styles.container, { paddingTop: top }]}>
      <ImageBackground
        source={require("../assets/images/image_frame01.png")}
        style={{ width: width, height: height }}
      >
        <Content>
          <ImageBackground source={require("../assets/images/image_union.png")} style={styles.hiThere}>
            <Text children="Hi There 👋" />
          </ImageBackground>
          <Image
            source={require("../assets/images/image_girl_with_laptop.png")}
            /* @ts-ignore */
            style={styles.girl}
          />
          <View style={styles.achieve}>
            {data.map((item, index) => {
              return (
                <Button
                  key={index}
                  accessoryRight={() => <Image source={require("../assets/images/image_wale.png")} />}
                  activeOpacity={0.7}
                  style={[{ backgroundColor: item.color }, styles.button]}
                />
              );
            })}
          </View>
          <Text
            children="My Courses"
            category="title3"
            status="white"
            marginLeft={24}
            marginBottom={16}
          />
          <Layout level="4" style={styles.card01}>
            <Image
              source={require("../assets/images/image_rectangle.png")}
              /* @ts-ignore */
              style={styles.imgCard}
            />
            <View style={styles.textCard}>
              <Text
                children="How to make UI Mobile App"
                category="headline"
                status="white"
              />
              <Text category="body" status="snow">
                Done:
                <Text category="headline" status="white" children=" 8" />
                /13
              </Text>
              <ProgressBar
                didDone={4}
                total={10}
                styleBar={styles.progressBar}
                style={styles.progressBar}
              />
            </View>
          </Layout>
          <Layout level="5" style={styles.card02}>
            <Image
              source={require("../assets/images/image_rectangle.png")}
              /* @ts-ignore */
              style={styles.imgCard}
            />
            <View style={styles.textCard}>
              <Text
                children="Better Marketing Design?"
                category="headline"
                status="white"
              />
              <Text category="body" status="snow">
                Done:
                <Text category="headline" status="white" children=" 8" />
                /13
              </Text>
              <ProgressBar
                didDone={4}
                total={10}
                styleBar={styles.progressBar}
                style={styles.progressBar}
              />
            </View>
          </Layout>
        </Content>
        <BottomBar />
      </ImageBackground>
    </Container>
  );
});

export default Profile10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  card01: {
    borderRadius: 12,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingLeft: 11,
    flexDirection: "row",
  },
  girl: {
    alignSelf: "center",
    marginTop: 30,
  },
  card02: {
    borderRadius: 12,
    marginHorizontal: 24,
    paddingVertical: 12,
    paddingLeft: 11,
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 120,
  },
  progressBar: {
    height: 8,
  },
  textCard: {
    marginLeft: 16,
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  achieve: {
    marginTop: 44,
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 64,
    height: 64,
  },
  imgCard: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  hiThere: {
    width: 130,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 18,
    marginBottom: -44,
    marginRight: 20,
    paddingHorizontal: 12,
  },
});
