import { useNonProfitsContext } from "contexts/nonProfitsContext";

import CausesFilter from "./TagsFilter";
import NonProfitsList from "./NonProfitsList";
import * as S from "./styles";

export type Props = {
  setUnauthorizedModalVisible: (value: boolean) => void;
};

export default function CausesSection({ setUnauthorizedModalVisible }: Props) {
  const { shuffledNonProfits } = useNonProfitsContext();

  return (
    <S.Container>
      <CausesFilter />
      <NonProfitsList
        nonProfits={shuffledNonProfits || []}
        setUnauthorizedModalVisible={setUnauthorizedModalVisible}
      />
    </S.Container>
  );
}
