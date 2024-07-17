import HeaderButtons from "../HeaderButtons";
import * as S from "./styles";

type Props = {
  showsTicketsCounter?: boolean;
  children?: JSX.Element | JSX.Element[];
  background?: any;
  hitSlop?: number;
};

function HeaderTemplate({
  showsTicketsCounter = false,
  children,
  background,
  hitSlop = 15,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Background source={background} />
      <HeaderButtons
        showsTicketsCounter={showsTicketsCounter}
        hitSlop={hitSlop}
      />
      {children}
    </S.Container>
  );
}

export default HeaderTemplate;
