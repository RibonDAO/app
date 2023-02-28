import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";
import { useNavigation } from "hooks/useNavigation";

type SlideProp = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

type Props = {
  slides: SlideProp[];
  skip: () => void;
  goToNextSlide: () => void;
  currentSlideIndex: number;
};

function Footer({ slides, skip, goToNextSlide, currentSlideIndex }: Props) {
  const { navigateTo } = useNavigation();
  const { height } = Dimensions.get("window");

  return (
    <View
      style={{
        height: height * 0.25,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {slides?.map((_, index) => (
          <View
            key={index}
            style={[
              S.indicator,
              currentSlideIndex == index && {
                backgroundColor: theme.colors.green40,
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex == slides?.length - 1 ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={S.btn}
              onPress={() => navigateTo("HomeScreen")}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: theme.colors.neutral10,
                }}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                S.btn,
                {
                  borderColor: theme.colors.green40,
                  borderWidth: 1,
                  backgroundColor: "transparent",
                },
              ]}
              onPress={skip}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: theme.colors.green40,
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={S.btn}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: theme.colors.neutral10,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default Footer;
