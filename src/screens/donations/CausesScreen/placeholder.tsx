import { ScrollView, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import S from "./styles";

function PaymentScreenPlaceholder() {
  return (
    <View style={[S.container, { paddingTop: 28, paddingHorizontal: 16 }]}>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={22} />
        <PlaceholderLine height={22} />
        <ScrollView horizontal style={S.causesContainer}>
          <PlaceholderMedia
            style={[
              S.causesCardContainer,
              {
                marginRight: 16,
                height: 288,
              },
            ]}
          />
          <PlaceholderMedia
            style={[
              S.causesCardContainer,
              {
                marginRight: 16,
                height: 288,
              },
            ]}
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
    </View>
  );
}

export default PaymentScreenPlaceholder;
