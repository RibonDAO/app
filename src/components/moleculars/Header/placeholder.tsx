import { View } from "react-native";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from "rn-placeholder";
import S from "./styles";

function HeaderPlaceholder() {
  return (
    <View>
      <Placeholder Animation={Fade}>
        <View style={S.container}>
          <PlaceholderMedia
            style={{
              height: 25,
              width: 25,
            }}
          />
          <View style={{ display: "flex", flexDirection: "row" }}>
            <PlaceholderMedia
              style={{
                height: 25,
                width: 35,
                marginRight: 5,
              }}
            />
            <PlaceholderMedia
              style={{
                height: 25,
                width: 25,
              }}
            />
          </View>
        </View>
      </Placeholder>
    </View>
  );
}

export default HeaderPlaceholder;
