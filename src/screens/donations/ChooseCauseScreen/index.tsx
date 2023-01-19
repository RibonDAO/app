
import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "components/Themed";
import { useCallback, useEffect } from "react";
import CauseImage from "./CauseImage";
import S from "./styles";
import { useCausesContext } from "contexts/causesContext";

function ChooseCauseScreen(): JSX.Element {
  const { activeCauses } = useCausesContext();

  useEffect(() => {
    console.log(activeCauses);
  }, [activeCauses])

  const causesList = useCallback(
    () =>
      activeCauses?.map((cause: Cause) => (
        <CauseImage
          key={cause.id}
          id={cause.id}
          name={cause.name}
          coverImage={cause.coverImage}
        />
      )),
    [activeCauses],
  );

  function renderModal() {
    return (
      <View style={S.container}>
        <Text style={S.text}>Escolha uma causa</Text>

        {causesList()}
      </View>
    );
  }

  return renderModal();
}

export default ChooseCauseScreen;
