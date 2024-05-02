import { useCallback, useState } from "react";
import NewTicketAnimation from "components/atomics/animations/NewTicketAnimation";
import { theme } from "@ribon.io/shared";
import { perform } from "lib/timeoutHelpers";
import { useFocusEffect } from "@react-navigation/native";
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
  startAnimation?: boolean;
};

export default function CollectableButton({
  colors = DEFAULT_COLORS,
  amount = 1,
  locked = false,
  text,
  afterText,
  onClick,
  startAnimation,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleStartAnimation = () => {
    setShowToast(false);
    setClicked(true);
    setDisabled(true);
    perform(() => !clicked && setShowToast(true)).in(500);
    perform(() => setShowToast(false)).in(3000);
  };

  useFocusEffect(
    useCallback(() => {
      if (startAnimation) {
        handleStartAnimation();
      }
    }, [startAnimation]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!locked) {
        setDisabled(false);
        setClicked(false);
      }
    }, [locked]),
  );

  return locked ? (
    <LockedButton colors={colors} text={afterText} />
  ) : (
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
