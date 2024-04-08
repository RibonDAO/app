import { Dimensions, View } from "react-native";
import ValidateAccount from "components/moleculars/validateAccount";

function Slide({ item }: any) {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ width, height }}>
      {item.id === "1" && (
        <ValidateAccount
          key={item.id}
          title="1"
          description=""
          onContinue={() => {}}
          onContinueMagicLink={() => {}}
        />
      )}
      {item.id === "2" && (
        <ValidateAccount
          key={item.id}
          title="2"
          description=""
          onContinue={() => {}}
          onContinueMagicLink={() => {}}
        />
      )}
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
