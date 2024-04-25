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

const slides: SlideProp[] = [
  {
    id: "1",
    image: "./assets/image1.png",
    title: "Receba vales",
    subtitle: "Todo dia você recebe um vale para fazer uma doação.",
  },
  {
    id: "2",
    image: "./assets/image2.png",
    title: "Doe vales",
    subtitle: "Com um vale, você pode doar para qualquer entidade cadastrada!",
  },
  {
    id: "3",
    image: "./assets/image3.png",
    title: "Gere vales",
    subtitle:
      "Quando contribui com dinheiro, você gera vales para as outras pessoas doarem!",
  },
];

function Onboarding() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<any>();
  const { width, height } = Dimensions.get("window");

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

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral10 }}>
      <StatusBar backgroundColor={theme.colors.neutral10} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Footer
        slides={slides}
        skip={skip}
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
      />
    </SafeAreaView>
  );
}

export default Onboarding;
