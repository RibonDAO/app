import React, { useEffect } from "react";
import { SafeAreaView, FlatList, StatusBar, Dimensions } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import { useNavigation } from "hooks/useNavigation";
import Slide from "./Slide";
import Footer from "./Footer";

type SlideProp = {
  id: string;
};

const slides: SlideProp[] = [
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
];

function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>();
  const { width } = Dimensions.get("window");

  const { navigateTo } = useNavigation();
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigateTo("CausesScreen");
    }
  };

  const goToPreviousSlide = () => {
    const previousSlideIndex = currentSlideIndex - 1;
    if (previousSlideIndex !== -1) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    const offset = index * width;
    ref?.current.scrollToOffset({ offset });
  };

  useEffect(() => {
    goToSlide(currentSlideIndex);
  }, [currentSlideIndex]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral10 }}>
      <StatusBar backgroundColor={theme.colors.neutral10} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: "100%" }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
        goToPreviousSlide={goToPreviousSlide}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </SafeAreaView>
  );
}

export default OnboardingScreen;
