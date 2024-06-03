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

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList nonProfits={filterNonProfits()} />
    </S.Container>
  );
}
