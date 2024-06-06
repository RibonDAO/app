import { NonProfit, theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import DefaultBackground from "./assets/DefaultBackground";

type Props = {
  nonProfit: NonProfit;
  primaryButtonClick: () => void;
  secondaryButtonClick: () => void;
  primaryButtonDisabled?: boolean;
};

function LastCard({
  nonProfit,
  primaryButtonClick,
  secondaryButtonClick,
  primaryButtonDisabled = false,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.lastCard",
  });

  return (
    <S.Container>
      <S.ImageBackground>
        <DefaultBackground />
      </S.ImageBackground>
      <S.OngLogo source={{ uri: nonProfit?.logo }} resizeMode="contain" />
      <S.OngName>{nonProfit?.name}</S.OngName>

      <S.ButtonContainer>
        <Button
          text={t("primaryButtonText")}
          onPress={primaryButtonClick}
          backgroundColor={theme.colors.brand.primary[600]}
          borderColor={theme.colors.brand.primary[600]}
          textColor={theme.colors.neutral10}
          customStyles={{ borderRadius: 12 }}
          disabled={primaryButtonDisabled}
        />
        <Button
          text={t("secondaryButtonText")}
          onPress={secondaryButtonClick}
          borderColorOutline={theme.colors.brand.primary[600]}
          textColorOutline={theme.colors.brand.primary[600]}
          customStyles={{ borderRadius: 12 }}
          outline
        />
      </S.ButtonContainer>

      <S.OngIcon source={{ uri: nonProfit?.icon }} />
    </S.Container>
  );
}

export default LastCard;
