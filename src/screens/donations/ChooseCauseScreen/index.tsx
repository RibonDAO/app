import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "react-native";
import { useCallback } from "react";
import CauseImage from "./CauseImage";
import S from "./styles";
import { useCausesContext } from "contexts/causesContext";
import { useTranslation } from "react-i18next";

function ChooseCauseScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.chooseCauseScreen",
  });
  const { activeCauses } = useCausesContext();

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
        <Text style={S.text}>{t("title")}</Text>

        {causesList()}
      </View>
    );
  }

  return renderModal();
}

export default ChooseCauseScreen;
