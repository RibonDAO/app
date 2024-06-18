import { useNonProfitsContext } from "contexts/nonProfitsContext";

import { useTagDonationContext } from "contexts/tagDonationContext";
import CausesFilter from "./TagsFilter";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export default function CausesSection() {
  const { chosenTag } = useTagDonationContext();
  const { nonProfitsWithPoolBalance: nonProfits } = useNonProfitsContext();

  const filterNonProfits = () => {
    if (chosenTag && chosenTag.nonProfits) {
      return chosenTag.nonProfits;
    }
    return nonProfits || [];
  };

  const shuffledNonProfits = filterNonProfits().sort(() => 0.5 - Math.random());

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList nonProfits={shuffledNonProfits} />
    </S.Container>
  );
}
