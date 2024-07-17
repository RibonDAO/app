import { useTranslation } from "react-i18next";
import { useReferralLink } from "hooks/useReferralLink";
import Star from "./assets/Shape";
import Letter from "./assets/Letter";
import * as S from "./styles";

function CardReferral(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "cardReferral",
  });
  const { copyLink } = useReferralLink();

  return (
    <S.Container>
      <S.ShapeContainer>
        <Star />
      </S.ShapeContainer>
      <Letter />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      <S.Button accessibilityRole="button" onPress={copyLink}>
        <S.Cta>{t("cta")}</S.Cta>
      </S.Button>
    </S.Container>
  );
}

export default CardReferral;
