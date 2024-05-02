import { NonProfit } from "@ribon.io/shared";
import * as S from "./styles";
import { ReactNode } from "react";
import Button from "components/atomics/buttons/Button";

type Props = {
  nonProfit: NonProfit;
  ticketsComponent: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  buttonDisabled: boolean;
};

function OngCard({
  nonProfit,
  ticketsComponent,
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
        <S.OngName>{nonProfit.name}</S.OngName>
        <S.Title>{nonProfit.impactTitle}</S.Title>

        {ticketsComponent}

        <S.ButtonContainer>
          <Button
            text={buttonText}
            onPress={onButtonClick}
            disabled={buttonDisabled}
          />
        </S.ButtonContainer>
      </S.ImageBackground>
    </S.Container>
  );
}

export default OngCard;
