import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import HandIcon from "components/vectors/HandIcon";
import { useCausesContext } from "contexts/causesContext";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useTasksContext } from "contexts/tasksContext";
import { theme } from "@ribon.io/shared";
import S from "./styles";
import CauseImage from "./CauseImage";

function ChooseCauseScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.chooseCauseScreen",
  });
  const { activeCauses } = useCausesContext();
  const { navigateTo } = useNavigation();

  function navigateToAvailableArticleScreen() {
    return navigateTo("AvailableArticleScreen");
  }

  const { registerAction } = useTasksContext();

  useEffect(() => {
    registerAction("P8_view");
  }, []);

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

        <View style={S.buttonContainer}>
          <Button
            text={t("buttonText")}
            customStyles={S.button}
            customTextStyles={{
              color: theme.colors.brand.primary[600],
            }}
            onPress={navigateToAvailableArticleScreen}
            outline
          />
        </View>
      </View>
    );
  }

  return renderCauses();
}

export default ChooseCauseScreen;
