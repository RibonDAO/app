import { Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import HandIcon from "components/vectors/HandIcon";
import { useTranslation } from "react-i18next";
import Button from "components/atomics/buttons/Button";
import { useNavigation } from "hooks/useNavigation";
import { useTasksContext } from "contexts/tasksContext";
import { theme, useDonations } from "@ribon.io/shared";
import { RootStackScreenProps } from "types";
import usePageView from "hooks/usePageView";
import { useCurrentUser } from "contexts/currentUserContext";
import S from "./styles";
import ContributionImage from "./ContributionImage";

function PostDonationScreen({
  route,
}: RootStackScreenProps<"PostDonationScreen">) {
  usePageView("P8_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.postDonationScreen",
  });
  const { navigateTo } = useNavigation();
  const { nonProfit, cause } = route.params;
  const { currentUser } = useCurrentUser();
  const { appDonationsCount } = useDonations(currentUser?.id);

  const navigateToAvailableArticleScreen = () => {
    if (appDonationsCount && appDonationsCount < 3)
      navigateTo("AvailableArticleScreen");
    else navigateTo("EarnTicketsScreen", { currentTab: 0 });
  };

  const { registerAction } = useTasksContext();

  useEffect(() => {
    registerAction("P8_view");
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
          from="givePostDonation_page"
        />
        <ContributionImage
          key={2}
          idCause={nonProfit.cause.id}
          name={nonProfit.name}
          coverImage={nonProfit.mainImage}
          from="givePostDonation_page"
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
