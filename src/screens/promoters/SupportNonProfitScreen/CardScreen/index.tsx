import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, Fragment } from "react";
import { logEvent } from "services/analytics";
import { useCauses, useNonProfits } from "@ribon.io/shared/hooks";
import { Cause, Offer, NonProfit } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import { useNavigation } from "hooks/useNavigation";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/GroupButtons";
import { useRouteParams } from "hooks/useRouteParams";
import * as S from "../styles";
import NonProfitCard from "./NonProfitCard";

function CardPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>();
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();
  const { nonProfits } = useNonProfits();
  const { causes } = useCauses();
  const {
    params: { causeDonated },
  } = useRouteParams<"SupportNonProfitScreen">();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    logEvent("nonProfitSupportScreen_view");
  }, []);

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(causeDonated || causesFilter()[0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("nonProfitCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const handleDonateClick = (nonProfit: NonProfit) => {
    setFlow("nonProfit");
    logEvent("nonProfitComCicleBtn_click");
    navigateTo("PaymentScreen", {
      offer: currentOffer,
      flow: "nonProfit",
      cause,
      nonProfit,
    });
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  const filteredNonProfits = useCallback(
    () =>
      nonProfits?.filter((nonProfit) => nonProfit.cause.id === cause?.id) || [],
    [cause, nonProfits],
  );

  const preSelectedIndex = () =>
    causeDonated
      ? causesFilter().findIndex((c) => c.id === causeDonated?.id)
      : 0;

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{t("title")}</S.Title>
      </S.TitleContainer>

      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        indexSelected={preSelectedIndex()}
        nameExtractor={(element) => element.name}
        backgroundColor={theme.colors.red40}
        textColorOutline={theme.colors.red40}
        borderColor={theme.colors.red40}
        borderColorOutline={theme.colors.red20}
      />
      <S.NonProfitsListContainer>
        {/* add inside slider */}
        {filteredNonProfits().map((nonProfit) => (
          <Fragment key={nonProfit.id}>
            <NonProfitCard
              nonProfit={nonProfit}
              handleOfferChange={handleOfferChange}
              handleDonate={() => handleDonateClick(nonProfit)}
            />
          </Fragment>
        ))}
      </S.NonProfitsListContainer>
    </S.Container>
  );
}

export default CardPage;
