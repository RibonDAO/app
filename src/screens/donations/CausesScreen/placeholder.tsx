import { ScrollView } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { theme } from "@ribon.io/shared";
import * as S from "./styles";

function PaymentScreenPlaceholder() {
  return (
    <S.Container style={{ paddingTop: 28, paddingHorizontal: 16 }}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={22} />
        <PlaceholderLine height={22} />
        <ScrollView
          horizontal
          style={{ display: "flex", flexDirection: "row" }}
        >
          <PlaceholderMedia
            style={{
              width: 256,
              marginHorizontal: theme.spacingNative(4),
              marginBottom: theme.spacingNative(16),
              marginRight: 16,
              height: 288,
            }}
          />
          <PlaceholderMedia
            style={{
              width: 256,
              marginHorizontal: theme.spacingNative(4),
              marginBottom: theme.spacingNative(16),
              marginRight: 16,
              height: 288,
            }}
          />
        </ScrollView>

        <PlaceholderMedia
          style={{
            marginTop: 14,
            width: "100%",
            height: 160,
          }}
        />
      </Placeholder>
    </S.Container>
  );
}

export default PaymentScreenPlaceholder;
