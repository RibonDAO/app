import { useSubscriptions } from "@ribon.io/shared/hooks";
import { useEffect } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useNavigation } from "hooks/useNavigation";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import BlueSun from "./assets/BlueSun";
import * as S from "./styles";
import Box from "./assets/Box";
import Wallet from "./assets/Wallet";
import BlueTicket from "./assets/BlueTicket";
import Clock from "./assets/Clock";
import Bag from "./assets/Bag";

export default function BusinessScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.businessScreen",
  });

  const { userSubscriptions } = useSubscriptions();
  const { subscriptions } = userSubscriptions();
  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    console.log(subscriptions);
    console.log(currentUser);
  }, [currentUser, subscriptions]);

  return (
    <S.Container>
      <S.BackgroundSun>
        <BlueSun />
      </S.BackgroundSun>
      <S.BackgroundBag>
        <Bag />
      </S.BackgroundBag>
      <S.MainContainer>
        <S.Header>
          <S.CompanyLogoContainer />

          <S.TextContainer>
            <S.Title>{t("title")}</S.Title>

            <S.Subtitle>{t("subtitle")}</S.Subtitle>
          </S.TextContainer>
        </S.Header>
        <S.BenefitsContainer>
          <S.Benefit>
            <BlueTicket />
            <S.BenefitTextContainer>
              <S.BenefitTitle>{t("firstBenefitTitle")}</S.BenefitTitle>
              <S.BenefitText>{t("firstBenefitDescription")}</S.BenefitText>
            </S.BenefitTextContainer>
          </S.Benefit>
          <S.Benefit>
            <Box />
            <S.BenefitTextContainer>
              <S.BenefitTitle>{t("secondBenefitTitle")}</S.BenefitTitle>
              <S.BenefitText>{t("secondBenefitDescription")}</S.BenefitText>
            </S.BenefitTextContainer>
          </S.Benefit>
          <S.Benefit>
            <Wallet />

            <S.BenefitTextContainer>
              <S.BenefitTitle>{t("thirdBenefitTitle")}</S.BenefitTitle>
              <S.BenefitText>{t("thirdBenefitDescription")}</S.BenefitText>
            </S.BenefitTextContainer>
          </S.Benefit>
          <S.Benefit>
            <Clock />
            <S.BenefitTextContainer>
              <S.BenefitTitle>{t("fourthBenefitTitle")}</S.BenefitTitle>
              <S.BenefitText>{t("fourthBenefitDescription")}</S.BenefitText>
            </S.BenefitTextContainer>
          </S.Benefit>
        </S.BenefitsContainer>
        <S.ButtonContainer>
          <Button
            text="Continue"
            onPress={() => {
              navigateTo("ClubScreen");
            }}
            backgroundColor={theme.colors.brand.quinary[800]}
            borderColor={theme.colors.brand.quinary[800]}
            textColor={theme.colors.neutral10}
          />
        </S.ButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}
