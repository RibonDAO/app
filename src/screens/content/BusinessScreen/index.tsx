import { useCurrentUser } from "contexts/currentUserContext";
import { useNavigation } from "hooks/useNavigation";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import { useTranslation } from "react-i18next";
import { useBusinessSubscriptionContext } from "contexts/businessSubscriptionContext";
import LottieAnimation from "components/atomics/LottieAnimation";
import * as S from "./styles";
import Box from "./assets/Box";
import Wallet from "./assets/Wallet";
import BlueTicket from "./assets/BlueTicket";
import BlueSunAnimation from "./assets/BlueSunAnimation.json";
import Clock from "./assets/Clock";
import Bag from "./assets/Bag";

export default function BusinessScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.businessScreen",
  });

  const { navigateTo } = useNavigation();
  const { currentUser } = useCurrentUser();
  const { businessPlan } = useBusinessSubscriptionContext();

  return (
    <>
      <S.BackgroundSun>
        <LottieAnimation
          animationData={BlueSunAnimation}
          width={466}
          height={466}
        />
      </S.BackgroundSun>
      <S.Container>
        <S.BackgroundBag>
          <Bag />
        </S.BackgroundBag>
        <S.MainContainer>
          <S.Header>
            <S.CompanyLogoContainer>
              <S.CompanyLogo source={{ uri: currentUser?.company?.logo }} />
            </S.CompanyLogoContainer>

            <S.TextContainer>
              <S.Title>{t("title")}</S.Title>

              <S.Subtitle>
                {t("subtitle", {
                  companyName: currentUser?.company?.name,
                })}
              </S.Subtitle>
            </S.TextContainer>
          </S.Header>
          <S.BenefitsContainer>
            <S.Benefit>
              <BlueTicket />
              <S.BenefitTextContainer>
                <S.BenefitTitle>{t("firstBenefitTitle")}</S.BenefitTitle>
                <S.BenefitText>
                  {t("firstBenefitDescription", {
                    dailyTickets: businessPlan?.dailyTickets,
                  })}
                </S.BenefitText>
              </S.BenefitTextContainer>
            </S.Benefit>
            <S.Benefit>
              <Box />
              <S.BenefitTextContainer>
                <S.BenefitTitle>{t("secondBenefitTitle")}</S.BenefitTitle>
                <S.BenefitText>
                  {t("secondBenefitDescription", {
                    monthlyTickets: businessPlan?.monthlyTickets,
                  })}
                </S.BenefitText>
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
                navigateTo("CausesScreen");
              }}
              backgroundColor={theme.colors.brand.quinary[800]}
              borderColor={theme.colors.brand.quinary[800]}
              textColor={theme.colors.neutral10}
            />
          </S.ButtonContainer>
        </S.MainContainer>
      </S.Container>
    </>
  );
}
