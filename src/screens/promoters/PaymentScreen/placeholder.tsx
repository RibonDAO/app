import { Text, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { theme } from "@ribon.io/shared/styles";
import styles from "./styles";

function PaymentScreenPlaceholder() {
  return (
    <View style={[styles.mainContainer, { paddingTop: 28 }]}>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 188,
            borderRadius: 14,
            marginBottom: 24,
          }}
        />
        <PlaceholderLine height={28} />
        <PlaceholderLine height={28} />
        <PlaceholderLine height={28} />
      </Placeholder>
    </View>
  );
}

export default PaymentScreenPlaceholder;
