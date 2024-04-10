import { Dimensions, View } from "react-native";
import FirstSection from "../../FirstSection";
import SecondSection from "../../SecondSection";
import ThirdSection from "../../ThirdSection";

function Slide({ item }: any) {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ width, height }}>
      {item.id === "1" && <FirstSection />}
      {item.id === "2" && <SecondSection key={item.id} />}
      {item.id === "3" && <ThirdSection />}
    </View>
  );
}

export default Slide;
