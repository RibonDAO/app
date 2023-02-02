import { theme } from "@ribon.io/shared";
import { View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import styles from "./styles";

function PaymentScreenPlaceholder() {
  return (
    <View style={[styles.container, { paddingTop: 14 }]}>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 144,
            borderRadius: 14,
            marginBottom: theme.spacingNative(24),
          }}
        />
        <PlaceholderLine height={28} />
        <PlaceholderLine height={28} />
      </Placeholder>
    </View>
  );
}

export default PaymentScreenPlaceholder;
