import { useEffect } from "react";
import { useCauseDonationContext } from "contexts/causesDonationContext";
import { useNonProfitsContext } from "contexts/nonProfitsContext";
import { useCausesContext } from "contexts/causesContext";
import CausesList from "./CausesList";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export default function CausesSection() {
  const { chosenCause } = useCauseDonationContext();
  const { nonProfitsWithPoolBalance: nonProfits } = useNonProfitsContext();
  const { causesWithPoolBalance: causes } = useCausesContext();

  const nonProfitsFilter = () => {
    if (chosenCause) {
      const nonProfitsFiltered = nonProfits?.filter(
        (nonProfit) => nonProfit?.cause?.id === chosenCause?.id,
      );

      return nonProfitsFiltered || [];
    }
    return nonProfits || [];
  };

  const sortNonProfits = () => {
    const filteredNonProfits = nonProfitsFilter();
    const sorted = [...filteredNonProfits].sort((a, b) => {
      const causeAIndex = causes.findIndex((cause) => cause.id === a.cause.id);
      const causeBIndex = causes.findIndex((cause) => cause.id === b.cause.id);

      return causeAIndex - causeBIndex;
    });
    return sorted;
  };

  useEffect(() => {
    sortNonProfits();
  }, [chosenCause]);

  return (
    <S.Container>
      <CausesList />
      <NonProfitsList nonProfits={sortNonProfits()} />
    </S.Container>
  );
}
