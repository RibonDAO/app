import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "react-native";
import { useCallback } from "react";
import CauseImage from "./CauseImage";
import HandIcon from "components/vectors/HandIcon";
import S from "./styles";
import { useCausesContext } from "contexts/causesContext";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";

function ChooseCauseScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.chooseCauseScreen",
  });
  const { activeCauses } = useCausesContext();
  const { navigateTo } = useNavigation();

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

  function renderCauses() {
    return (
      <View style={S.container}>
        <View style={S.imageContainer}>
          <HandIcon />
        </View>

        <Text style={S.text}>{t("title")}</Text>

        {causesList()}

        <View style={{ width: "100%", position: "absolute", bottom: 60 }}>
          <Button text="Doar depois" onPress={() => navigateTo("CausesScreen")} outline />
        </View>
      </View>
    );
  }

  return renderCauses();
}

export default ChooseCauseScreen;
