import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Image from "components/atomics/Image";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "components/atomics/Icon";
import S from "./styles";

const { width, height } = Dimensions.get("window");

type Story = {
  url: string;
  heading: string;
  description: string;
};

type Props = {
  stories: Story[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
  avatar?: string;
  title?: string;
  subtitle?: string;
};
export default function CardStories({
  stories,
  visible,
  setVisible,
  avatar,
  title,
  subtitle,
}: Props) {
  const [content, setContent] = useState<any>([]);

  useEffect(() => {
    setContent(
      stories.map((story, idx) => ({
        content: story.url,
        heading: story.heading,
        description: story.description,
        finish: 0,
        id: idx,
      })),
    );
  }, [JSON.stringify(stories)]);

  const [end] = useState(0);
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  function close() {
    progress.setValue(0);
    setVisible(false);
  }

  function next() {
    // check if the next content is not empty
    if (current !== content.length - 1) {
      const data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      // the next content is empty
      close();
    }
  }
  function start(n: number) {
    Animated.timing(progress, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  }

  function play() {
    start(end);
  }

  function previous() {
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      const data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
    } else {
      // the previous content is empty
      close();
    }
  }

  return (
    <Modal
      animationType="fade"
      presentationStyle="pageSheet"
      transparent={false}
      visible={visible}
    >
      <SafeAreaView style={S.containerModal} edges={["top", "bottom"]}>
        <View style={S.backgroundContainer}>
          <Image
            onLoadEnd={() => {
              progress.setValue(0);
              play();
            }}
            source={{
              uri: content[current]?.content,
            }}
            style={{ width, height, resizeMode: "cover" }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 100,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingHorizontal: 10,
            }}
          >
            {content.map((index, key) => (
              <View
                key={index.id}
                style={{
                  height: 2,
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(117, 117, 117, 0.5)",
                  marginHorizontal: 2,
                }}
              >
                <Animated.View
                  style={{
                    flex: current === key ? progress : content[key].finish,
                    height: 2,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  }}
                />
              </View>
            ))}
          </View>
          <View
            style={{
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <View />
            <TouchableOpacity
              onPress={() => {
                close();
              }}
            >
              <View style={S.crossIconContainer}>
                <Icon type="rounded" size={28} color="white" name="close" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={S.contentContainer}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,1)"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 300,
              }}
            />
            <View style={S.headingContainer}>
              {content[current]?.heading && (
                <Text style={S.heading}>{content[current]?.heading}</Text>
              )}
              {content[current]?.description && (
                <Text style={S.description}>
                  {content[current]?.description}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {avatar && (
                <Image
                  style={S.avatar}
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <View style={S.titlesContainer}>
                {title && <Text style={S.title}>{title}</Text>}
                {subtitle && <Text style={S.subtitle}>{subtitle}</Text>}
              </View>
            </View>
          </View>
          <View style={S.passStoryView}>
            <TouchableWithoutFeedback onPress={() => previous()}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => next()}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
