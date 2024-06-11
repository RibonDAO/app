import HeaderButtons from "../HeaderButtons";
import * as S from "./styles";

type Props = {
  showsTicketsCounter?: boolean;
  children?: JSX.Element | JSX.Element[];
  background?: any;
};

function HeaderTemplate({
  showsTicketsCounter = false,
  children,
  background,
}: Props): JSX.Element {
  return (
    <S.Container>
      <S.Background source={background} />
      <HeaderButtons showsTicketsCounter={showsTicketsCounter} />
      {children}
    </S.Container>
  );
}

export default HeaderTemplate;
