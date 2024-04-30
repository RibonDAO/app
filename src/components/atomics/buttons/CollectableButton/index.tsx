import { useEffect, useState } from "react";
import NewTicketAnimation from "components/atomics/animations/NewTicketAnimation";
import { theme } from "@ribon.io/shared";
import {
  BackgroundLayersAnimation,
  TextAnimation,
  AfterTextAnimation,
  LockedButton,
} from "./elements";
import * as S from "./styles";

const DEFAULT_COLORS = [
  theme.colors.brand.primary[800], // initial color
  theme.colors.brand.tertiary[600],
  "#F97303",
  theme.colors.brand.quaternary[200],
  theme.colors.brand.primary[100], // final color
];

export type Props = {
  colors?: string[];
  amount?: number;
  locked?: boolean;
  onClick: () => void;
  text: string;
  afterText: string;
  collected?: boolean;
};

export default function CollectableButton({
  colors = DEFAULT_COLORS,
  amount = 1,
  locked = false,
  text,
  afterText,
  onClick,
  collected,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    onClick();
  };

  useEffect(() => {
    if (collected) {
      setTimeout(() => {
        if (!clicked) setShowToast(true);
      }, 500);

      setTimeout(() => {
        setShowToast(false);
      }, 10000);

      setClicked(true);
      setDisabled(true);
    } else {
      setClicked(false);
      setDisabled(false);
    }
  }, [collected]);

  if (locked) return <LockedButton colors={colors} text={afterText} />;

  return (
    <S.Container onPress={handleClick} disabled={disabled}>
      <S.ToastContainer>
        {showToast && <NewTicketAnimation count={amount} />}
      </S.ToastContainer>
      <S.ButtonContainer>
        <S.TextContainer>
          {clicked ? (
            <AfterTextAnimation colors={colors} text={afterText} />
          ) : (
            <TextAnimation text={text} />
          )}
        </S.TextContainer>
        {clicked && <BackgroundLayersAnimation colors={colors} />}
      </S.ButtonContainer>
    </S.Container>
  );
}
