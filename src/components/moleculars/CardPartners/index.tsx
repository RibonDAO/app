import { useTranslation } from "react-i18next";
import { useLanguage } from "contexts/languageContext";
import { logEvent } from "services/analytics";
import { openInWebViewer } from "lib/linkOpener";
import { TouchableOpacity } from "react-native";
import Handshake from "./assets/Handshake";
import HalfCircle from "./assets/HalfCircle";
import Brands from "./assets/br-brands.png";
import * as S from "./styles";

function CardPartners(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "cardPartners",
  });

  const { currentLang } = useLanguage();

  const handleClick = () => {
    logEvent("partnersPage_click");
    openInWebViewer(t("ctaLink"));
  };

  return (
    <S.Container>
      <S.HalfCircleContainer>
        <HalfCircle />
      </S.HalfCircleContainer>
      <Handshake />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      {currentLang === "pt-BR" && <S.Brands source={Brands} />}
      <TouchableOpacity accessibilityRole="button" onPress={handleClick}>
        <S.Cta>{t("ctaText")}</S.Cta>
      </TouchableOpacity>
    </S.Container>
  );
}

export default CardPartners;
