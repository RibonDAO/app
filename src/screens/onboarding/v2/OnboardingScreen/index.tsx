import React, { useEffect } from "react";
import { FlatList, Dimensions } from "react-native";

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
    } else if (nextSlideIndex === slides.length) {
      navigateTo("TabNavigator", { screen: "CausesScreen" });
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
    <>
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
    </>
  );
}

export default OnboardingScreen;
