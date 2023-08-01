import { View } from "react-native";
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
    <View style={[styles.container, { paddingTop: 28 }]}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={28} />
        <PlaceholderLine height={28} />
        <PlaceholderLine height={28} />

        <PlaceholderMedia
          style={{
            width: "100%",
            height: 288,
            borderRadius: 14,
            marginBottom: theme.spacingNative(24),
          }}
        />
        <PlaceholderLine height={28} />
      </Placeholder>
    </View>
  );
}

export default PaymentScreenPlaceholder;
