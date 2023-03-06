import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

function ForYouScreenPlaceholder() {
  return (
    <View>
      <Placeholder Animation={Fade}>
        <PlaceholderLine height={32} noMargin style={{ borderRadius: 5 }} />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <PlaceholderLine height={14} width={30} style={{ marginTop: 16 }} />
          <PlaceholderLine
            height={14}
            width={20}
            style={{ marginTop: 16, marginLeft: 16 }}
          />
        </View>
        <PlaceholderLine
          height={20}
          width={100}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={80}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={90}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 200,
            borderRadius: 5,
            marginTop: theme.spacingNative(16),
            marginBottom: theme.spacingNative(24),
          }}
        />
        <PlaceholderLine height={1} />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <PlaceholderLine height={14} width={25} style={{ marginTop: 16 }} />
          <PlaceholderLine
            height={14}
            width={20}
            style={{ marginTop: 16, marginLeft: 16 }}
          />
        </View>
        <PlaceholderLine
          height={20}
          width={90}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={100}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={60}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 200,
            borderRadius: 5,
            marginTop: theme.spacingNative(16),
            marginBottom: theme.spacingNative(24),
          }}
        />
        <PlaceholderLine height={1} />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <PlaceholderLine height={14} width={30} style={{ marginTop: 16 }} />
          <PlaceholderLine
            height={14}
            width={20}
            style={{ marginTop: 16, marginLeft: 16 }}
          />
        </View>
        <PlaceholderLine
          height={20}
          width={100}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={80}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderLine
          height={20}
          width={90}
          style={{ borderRadius: 5, marginBottom: 8 }}
          noMargin
        />
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 200,
            borderRadius: 5,
            marginTop: theme.spacingNative(16),
            marginBottom: theme.spacingNative(24),
          }}
        />
      </Placeholder>
    </View>
  );
}

export default ForYouScreenPlaceholder;
