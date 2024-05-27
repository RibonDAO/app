import GroupButtons from "components/moleculars/GroupButtons";
import { useCausesContext } from "contexts/causesContext";
import { useCauseDonationContext } from "contexts/causesDonationContext";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export default function CausesFilter() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { causesWithPoolBalance: causes } = useCausesContext();
  const { setChosenCauseIndex, setChosenCause, chosenCauseIndex } =
    useCauseDonationContext();

  const filteredCauses = () => {
    const causesApi = causes.filter((cause) => cause.status === "active");
    return (
      [
        {
          id: 0,
          name: t("allCauses"),
        },
        ...causesApi,
      ] || []
    );
  };

  const handleCauseChange = (_element: any, index: number) => {
    const cause = _element;
    setChosenCauseIndex(index);
    if (cause.id !== 0) {
      setChosenCause(cause);
    } else {
      setChosenCause(undefined);
    }
  };

  return (
    <S.Container>
      <S.Scroll horizontal showsHorizontalScrollIndicator={false}>
        <GroupButtons
          elements={filteredCauses()}
          onChange={handleCauseChange}
          nameExtractor={(cause) => cause.name}
          indexSelected={chosenCauseIndex}
        />
      </S.Scroll>
    </S.Container>
  );
}
