import { useEffect, useState } from "react";
import { useCauseDonationContext } from "contexts/causesDonationContext";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import { NonProfit } from "@ribon.io/shared/types";
import CardNonProfitStories from "components/moleculars/CardNonProfitStories";
import CausesFilter from "./CausesFilter";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export default function CausesSection() {
  const { chosenCause } = useCauseDonationContext();
  const { nonProfitsWithPoolBalance: nonProfits } = useNonProfitsContext();
  const { causesWithPoolBalance: causes } = useCausesContext();
  const [sortedNonProfits, setSortedNonProfits] = useState<NonProfit[]>(
    nonProfits || [],
  );

  const filterNonProfits = () => {
    if (!chosenCause) return nonProfits || [];

    const chosenCauseId = chosenCause.id;
    return (
      nonProfits?.filter(
        (nonProfit) => nonProfit?.cause?.id === chosenCauseId,
      ) || []
    );
  };

  const sortNonProfits = () => {
    const filteredNonProfits = filterNonProfits();

    return filteredNonProfits.slice().sort((a, b) => {
      const causeAId = a.cause.id;
      const causeBId = b.cause.id;

      return (
        causes.findIndex((cause) => cause.id === causeAId) -
        causes.findIndex((cause) => cause.id === causeBId)
      );
    });
  };
  const markdownTest = `
  ### **Quem recebe sua doação**
  Direcionadas a pessoas em regiões de risco na Nigériaduhsoiuhiuhsiod lkshdoihpsi aoihdiuosgha aohdpisugha sohdpiodh

  **O projeto oferece:**
  - lorem ipsum dot
  - lorem ipsum dot
  - lorem ipsum dot
  - lorem ipsum do
  `;

  useEffect(() => {
    setSortedNonProfits(sortNonProfits());
  }, [chosenCause]);

  return (
    <S.Container>
      <CausesFilter />
      <CardNonProfitStories markdownText={markdownTest} />
      <NonProfitsList nonProfits={sortedNonProfits} />
    </S.Container>
  );
}
