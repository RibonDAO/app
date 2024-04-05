import React from "react";
import { SafeAreaView, FlatList, StatusBar, Dimensions } from "react-native";
import { theme } from "@ribon.io/shared/styles";
import Slide from "./Slide";
import Footer from "./Footer";

type SlideProp = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

const slides: SlideProp[] = [];

function Onboarding() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>();
  const { width } = Dimensions.get("window");

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    const previousSlideIndex = currentSlideIndex - 1;
    if (previousSlideIndex !== slides.length) {
      const offset = previousSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // const skip = () => {
  //   const lastSlideIndex = slides.length - 1;
  //   const offset = lastSlideIndex * width;
  //   ref?.current.scrollToOffset({ offset });
  //   setCurrentSlideIndex(lastSlideIndex);
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral10 }}>
      <StatusBar backgroundColor={theme.colors.neutral10} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: 100 }}
        showsHorizontalScrollIndicator
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
      />
    </SafeAreaView>
  );
}

export default Onboarding;
