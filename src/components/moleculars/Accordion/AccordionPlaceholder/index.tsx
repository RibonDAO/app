import { View } from "react-native";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";

function AccordionPlaceholder() {
  return (
    <View style={{ flex: 1, padding: 16 }} testID="placeholder">
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 100,
          }}
        />
      </Placeholder>
    </View>
  );
}

export default AccordionPlaceholder;
