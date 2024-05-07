import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { openInWebViewer } from "lib/linkOpener";
import Letter from "./assets/Letter";
import Star from "./assets/Shape";
import * as S from "./styles";

function CardReferral(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "cardReferral",
  });

  const handleClick = () => {
    logEvent("partnersPage_click");
    openInWebViewer(t("ctaLink"));
  };

  return (
    <S.Container>
      <S.ShapeContainer>
        <Star />
      </S.ShapeContainer>
      <Letter />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      <S.Button accessibilityRole="button" onPress={handleClick}>
        <S.Cta>{t("cta")}</S.Cta>
      </S.Button>
    </S.Container>
  );
}

export default CardReferral;
