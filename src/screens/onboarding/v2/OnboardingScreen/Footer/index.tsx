import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import S from "./styles";

type SlideProp = {
  id: string;
};

type Props = {
  slides: SlideProp[];
  goToNextSlide: () => void;
  goToPreviousSlide: () => void;
  setCurrentSlideIndex: (index: number) => void;
  currentSlideIndex: number;
};

function Footer({
  slides,
  goToNextSlide,
  goToPreviousSlide,
  setCurrentSlideIndex,
  currentSlideIndex,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.v2.onboardingScreen",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={goToPreviousSlide}
        style={S.buttonContainer}
      >
        <Icon
          type="outlined"
          name="chevron_left"
          size={20}
          color={theme.colors.neutral[700]}
        />
        <Text style={S.buttonText}>{t("previous")}</Text>
      </TouchableOpacity>
      <View style={S.indicatorContainer}>
        {slides?.map((_, index) => (
          <TouchableOpacity accessibilityRole="button"
            style={S.indicatorTouch}
            onPress={() => setCurrentSlideIndex(index)}
          >
            <View
              key={_.id}
              style={[
                S.indicator,
                currentSlideIndex === index && {
                  backgroundColor: theme.colors.brand.primary[300],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={goToNextSlide}
        style={S.buttonContainer}
      >
        <Text
          style={
            slides.length > 1 && currentSlideIndex === slides.length - 1
              ? S.buttonStart
              : S.buttonText
          }
        >
          {slides.length > 1 && currentSlideIndex === slides.length - 1
            ? t("start")
            : t("next")}
        </Text>
        <Icon
          type="outlined"
          name="chevron_right"
          size={20}
          color={
            slides.length > 1 && currentSlideIndex === slides.length - 1
              ? theme.colors.brand.primary[500]
              : theme.colors.neutral[700]
          }
        />
      </TouchableOpacity>
    </View>
  );
}

export default Footer;
