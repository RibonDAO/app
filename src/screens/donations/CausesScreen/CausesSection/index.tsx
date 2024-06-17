import { useNonProfitsContext } from "contexts/nonProfitsContext";

import { useTagDonationContext } from "contexts/tagDonationContext";
import { useCausesContext } from "contexts/causesContext";
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

  const sortNonProfits = () => {
    const filteredNonProfits = filterNonProfits();
    const { causesWithPoolBalance: causes } = useCausesContext();

    return filteredNonProfits.slice().sort((a, b) => {
      const causeAId = a.cause.id;
      const causeBId = b.cause.id;

      return (
        causes.findIndex((cause) => cause.id === causeAId) -
        causes.findIndex((cause) => cause.id === causeBId)
      );
    });
  };

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList nonProfits={sortNonProfits()} />
    </S.Container>
  );
}
