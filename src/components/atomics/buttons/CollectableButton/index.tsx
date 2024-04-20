import { useState } from "react";
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
  theme.colors.brand.primary[900], // Initial color
  theme.colors.brand.primary[700],
  theme.colors.brand.primary[600],
  theme.colors.brand.primary[300],
  theme.colors.brand.primary[50], // Final color
];

export type Props = {
  colors?: string[];
  amount?: number;
  locked?: boolean;
  onClick: () => void;
  text: string;
  afterText: string;
};

export default function CollectableButton({
  colors = DEFAULT_COLORS,
  amount = 1,
  locked = false,
  text,
  afterText,
  onClick,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(false);
    setClicked(!clicked);
    setDisabled(true);
    onClick();

    setTimeout(() => {
      if (!clicked) setShowToast(true);
    }, 500);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (locked) return <LockedButton colors={colors} text={afterText} />;

  return (
    <S.Container onPress={handleClick} disabled={disabled}>
      <S.ToastContainer>
        {showToast && <NewTicketAnimation count={amount} />}
      </S.ToastContainer>
      <S.MainContainer>
        <S.TextContainer>
          {clicked ? (
            <AfterTextAnimation colors={colors} text={afterText} />
          ) : (
            <TextAnimation text={text} />
          )}
        </S.TextContainer>
        {clicked && <BackgroundLayersAnimation colors={colors} />}
      </S.MainContainer>
    </S.Container>
  );
}
