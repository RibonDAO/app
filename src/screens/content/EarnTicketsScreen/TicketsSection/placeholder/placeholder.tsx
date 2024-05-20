import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";
import * as S from "./styles";

function TicketCardPlaceholder() {
  return (
    <S.Container>
      <Placeholder Animation={Fade}>
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 172,
            borderRadius: 16,
          }}
        />
      </Placeholder>
    </S.Container>
  );
}

export default TicketCardPlaceholder;
