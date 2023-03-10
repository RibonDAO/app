import { theme } from "@ribon.io/shared/styles";
import { StyleSheet, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

function NewsPlaceholder() {
  return (
    <Placeholder Animation={Fade}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <PlaceholderMedia
            style={{ width: 128, height: 128, borderRadius: 5 }}
          />
        </View>
        <View style={styles.rightColumn}>
          <PlaceholderLine
            height={12}
            width={30}
            style={{ marginVertical: 8 }}
          />
          <PlaceholderLine height={16} width={40} style={{ marginBottom: 8 }} />
          <PlaceholderLine height={18} width={95} style={{ marginBottom: 6 }} />
          <PlaceholderLine height={18} width={97} style={{ marginBottom: 6 }} />
          <PlaceholderLine height={18} width={75} />
        </View>
      </View>
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 128,
    marginBottom: theme.spacingNative(24),
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    width: 128,
    height: 128,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacingNative(8),
    flexGrow: 1,
  },
});

export default NewsPlaceholder;
