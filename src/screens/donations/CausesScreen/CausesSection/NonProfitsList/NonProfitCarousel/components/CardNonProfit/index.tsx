import { NonProfit, theme } from "@ribon.io/shared";
import Button from "components/atomics/buttons/Button";
import * as S from "./styles";
import TicketIconText from "../../../../../../../../components/moleculars/TicketIconText";

type Props = {
  nonProfit: NonProfit;
  ticketsQuantity: number;
  buttonText: string;
  onButtonClick: () => void;
  buttonDisabled: boolean;
};

function CardNonProfit({
  nonProfit,
  ticketsQuantity,
  buttonText,
  onButtonClick,
  buttonDisabled,
}: Props) {
  return (
    <S.Container>
      <S.ImageBackground
        source={{ uri: nonProfit.coverImage }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 16 }}
      >
        <S.Content>
          <S.OngName>{nonProfit.name}</S.OngName>
          <S.Title>{nonProfit.impactTitle}</S.Title>

          <S.TicketsContainer>
            <TicketIconText
              quantity={ticketsQuantity}
              buttonDisabled
              color={theme.colors.brand.primary[800]}
            />
          </S.TicketsContainer>
        </S.Content>

        <S.ButtonContainer>
          <Button
            text={buttonText}
            onPress={onButtonClick}
            disabled={buttonDisabled}
            customStyles={{ borderRadius: 12, borderWidth: 0 }}
            backgroundColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral10}
          />
        </S.ButtonContainer>
      </S.ImageBackground>
    </S.Container>
  );
}

export default CardNonProfit;
