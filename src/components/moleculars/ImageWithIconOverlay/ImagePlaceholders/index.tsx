import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";
import * as S from "./styles";

function LeftImagePlaceholder() {
  return (
    <S.LeftImageContainer>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
          }}
        />
      </Placeholder>
    </S.LeftImageContainer>
  );
}

function RightImagePlaceholder() {
  return (
    <S.RightContainer>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
          }}
        />
      </Placeholder>
    </S.RightContainer>
  );
}

export { LeftImagePlaceholder, RightImagePlaceholder };
