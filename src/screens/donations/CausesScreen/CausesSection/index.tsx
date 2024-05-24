import { useEffect, useState } from "react";

import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { NonProfit } from "@ribon.io/shared/types";
import { useTagDonationContext } from "contexts/tagDonationContext";
import CausesFilter from "./TagsFilter";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export default function CausesSection() {
  const { chosenTag } = useTagDonationContext();
  const { nonProfitsWithPoolBalance: nonProfits } = useNonProfitsContext();
  const { causesWithPoolBalance: causes } = useCausesContext();
  const [sortedNonProfits, setSortedNonProfits] = useState<NonProfit[]>(
    nonProfits || [],
  );

  const filterNonProfits = () => {
    if (!chosenTag) return nonProfits || [];

    return chosenTag.nonProfits;
  };

  const sortNonProfits = () => {
    const filteredNonProfits = filterNonProfits();

    return filteredNonProfits?.slice().sort((a, b) => {
      const causeAId = a.cause.id;
      const causeBId = b.cause.id;

      return (
        causes.findIndex((cause) => cause.id === causeAId) -
        causes.findIndex((cause) => cause.id === causeBId)
      );
    });
  };

  useEffect(() => {
    setSortedNonProfits(sortNonProfits() || []);
  }, [chosenTag]);

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList nonProfits={sortedNonProfits} />
    </S.Container>
  );
}
