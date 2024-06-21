import { useNonProfitsContext } from "contexts/nonProfitsContext";

import CausesFilter from "./TagsFilter";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export default function CausesSection() {
  const { shuffledNonProfits } = useNonProfitsContext();

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList nonProfits={shuffledNonProfits || []} />
    </S.Container>
  );
}
