import { View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

function PaymentScreenPlaceholder() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={38} />
        <PlaceholderLine height={28} />
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 388,
            borderRadius: 14,
            marginBottom: 24,
          }}
        />
      </Placeholder>
    </View>
  );
}

export default PaymentScreenPlaceholder;
