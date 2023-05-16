import { Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import HandIcon from "components/vectors/HandIcon";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useTasksContext } from "contexts/tasksContext";
import { theme } from "@ribon.io/shared";
import { RootStackScreenProps } from "types";
import ContributionImage from "./ContributionImage";
import S from "./styles";

function PostDonationScreen({
  route,
}: RootStackScreenProps<"PostDonationScreen">) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen",
  });
  const { navigateTo } = useNavigation();
  const { nonProfit, cause } = route.params;

  const navigateToAvailableArticleScreen = () =>
    navigateTo("AvailableArticleScreen");

  const { finishTask } = useTasksContext();

  useEffect(() => {
    finishTask("donate_ticket");
    setTimeout(() => {
      finishTask("donate_ticket_on_native");
    }, 1000);
  }, []);

  const contributionList = useCallback(
    () => (
      <>
        <ContributionImage
          key={1}
          idCause={cause.id}
          name={cause.name}
          coverImage={cause.coverImage}
          isCause
        />
        <ContributionImage
          key={2}
          idCause={nonProfit.cause.id}
          name={nonProfit.name}
          coverImage={nonProfit.mainImage}
        />
      </>
    ),
    [nonProfit, cause],
  );

  function renderContributionCards() {
    return (
      <View style={S.container}>
        <View style={S.imageContainer}>
          <HandIcon />
        </View>

        <Text style={S.text}>{t("title")}</Text>

        {contributionList()}

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

  return renderContributionCards();
}

export default PostDonationScreen;
