import { NonProfit, Story } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import ZeroDonationsSection from "screens/users/ImpactScreen/ZeroDonationsSection";
import { useState } from "react";
import { useStories } from "@ribon.io/shared";
import { logEvent } from "services/analytics";
import { Image as ExpoImage } from "expo-image";
import { logError } from "services/crashReport";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import { useNavigation } from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import ImpactDonationsVector from "screens/users/ImpactScreen/CommunityDonationsImpactCards/ImpactDonationsVector";
import { useTicketsContext } from "contexts/ticketsContext";
import Stories from "../Stories";
import * as S from "./styles";

export type Props = {
  nonProfits: NonProfit[];
};

export default function NonProfitsList({ nonProfits }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { fetchNonProfitStories } = useStories();
  const { formattedImpactText } = useFormattedImpactText();
  const { navigateTo } = useNavigation();
  const { hasTickets, ticketsCounter } = useTicketsContext();
  const { signedIn } = useCurrentUser();

  const [stories, setStories] = useState<Story[]>([]);
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [currentNonProfit, setCurrentNonProfit] = useState<NonProfit>(
    {} as NonProfit,
  );

  const handleNonProfitImagePress = async (nonProfit: NonProfit) => {
    setCurrentNonProfit(nonProfit);
    try {
      const nonProfitStories = await fetchNonProfitStories(nonProfit.id);
      ExpoImage.prefetch(nonProfitStories.map((story) => story.image));
      if (nonProfitStories.length === 0) return;
      setStories(nonProfitStories);
      setStoriesVisible(true);
      logEvent("storiesBtn_click", {
        nonProfitId: nonProfit.id,
        from: "NGOCard",
      });
    } catch (e) {
      logError(e);
    }
  };

  const handleButtonPress = (nonProfit: NonProfit) => {
    logEvent("donateTicketBtn_start", {
      nonProfitId: nonProfit.id,
      from: "nonprofitCard",
    });
    if (signedIn) {
      navigateTo("SelectTicketsScreen", {
        nonProfit,
        cause: nonProfit.cause,
      });
    } else {
      navigateTo("DonationSignInScreen", { nonProfit });
    }
  };

  return nonProfits.length ? (
    <S.Container horizontal showsHorizontalScrollIndicator={false}>
      {currentNonProfit && (
        <Stories
          stories={stories}
          nonProfit={currentNonProfit}
          storiesVisible={storiesVisible}
          setStoriesVisible={setStoriesVisible}
        />
      )}

      {nonProfits?.map((nonProfit, index) => {
        const minNumberOfTickets =
          nonProfit?.nonProfitImpacts?.[0]?.minimumNumberOfTickets ?? 0;
        const hasEnoughTickets =
          hasTickets && ticketsCounter >= minNumberOfTickets;
        return (
          <S.NonProfitContainer
            isFirst={index === 0}
            isLast={index === nonProfits.length - 1}
            key={nonProfit.id}
          >
            <CardCenterImageButton
              image={nonProfit.mainImage}
              infoTextTop={nonProfit.name}
              imageDescription={formattedImpactText(
                nonProfit,
                undefined,
                false,
                false,
                undefined,
                t("impactPrefix") || "",
              )}
              iconSubtitle={{
                icon: "confirmation_number",
                boldText: String(minNumberOfTickets),
                text: t("iconText"),
              }}
              buttonText={
                hasEnoughTickets ? t("buttonText") : t("notEnoughTickets")
              }
              onImagePress={() => {
                handleNonProfitImagePress(nonProfit);
              }}
              onClickButton={() => handleButtonPress(nonProfit)}
              buttonDisabled={!hasEnoughTickets}
              labelText={t("labelText") || ""}
            />
          </S.NonProfitContainer>
        );
      })}
    </S.Container>
  ) : (
    <S.NotFoundContainer>
      <ZeroDonationsSection
        title={t("noCauses.title")}
        onButtonPress={() => navigateTo("ClubScreen")}
        description={t("noCauses.text")}
        buttonText={t("noCauses.button")}
        image={<ImpactDonationsVector />}
      />
    </S.NotFoundContainer>
  );
}
