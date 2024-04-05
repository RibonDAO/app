import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type SlideProp = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

type Props = {
  slides: SlideProp[];
  goToNextSlide: () => void;
  goToPreviousSlide: () => void;
  currentSlideIndex: number;
};

function Footer({
  slides,
  goToNextSlide,
  goToPreviousSlide,
  currentSlideIndex,
}: Props) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {slides?.map((_, index) => (
          <View
            key={_.id}
            style={[
              S.indicator,
              currentSlideIndex === index && {
                backgroundColor: theme.colors.green40,
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity accessibilityRole="button"
            activeOpacity={0.8}
            style={[
              S.btn,
              {
                borderColor: theme.colors.green40,
                borderWidth: 1,
                backgroundColor: "transparent",
              },
            ]}
            onPress={goToPreviousSlide}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: theme.colors.green40,
              }}
            >
              Previous
            </Text>
          </TouchableOpacity>
          <View style={{ width: 15 }} />
          <TouchableOpacity accessibilityRole="button"
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
              {slides.length > 1 && currentSlideIndex === slides.length - 1
                ? "COMEÇAR"
                : "NEXT"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Footer;
