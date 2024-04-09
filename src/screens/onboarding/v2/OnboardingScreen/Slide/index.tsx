import { Dimensions, View } from "react-native";
import ValidateAccount from "components/moleculars/validateAccount";
import FirstSection from "../../FirstSection";
import SecondSection from "../../SecondSection";

function Slide({ item }: any) {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ width, height }}>
      {item.id === "1" && <FirstSection />}
      {item.id === "2" && <SecondSection key={item.id} />}
      {item.id === "3" && (
        <ValidateAccount
          key={item.id}
          title="3"
          description=""
          onContinue={() => {}}
          onContinueMagicLink={() => {}}
        />
      )}
    </View>
  );
}

export default Slide;
