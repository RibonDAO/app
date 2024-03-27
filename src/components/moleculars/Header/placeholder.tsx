import { View } from "react-native";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";
import * as S from "./styles";

function HeaderPlaceholder() {
  return (
    <View>
      <Placeholder Animation={Fade}>
        <S.Container>
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
        </S.Container>
      </Placeholder>
    </View>
  );
}

export default HeaderPlaceholder;
