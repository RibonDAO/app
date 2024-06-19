import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";
import * as S from "./styles";

function NonProfitImagePlaceholder() {
  return (
    <S.PlaceholderContainer>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 16,
          }}
        />
      </Placeholder>
    </S.PlaceholderContainer>
  );
}

export default NonProfitImagePlaceholder;
