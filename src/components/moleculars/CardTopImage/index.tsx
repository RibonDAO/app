import React from "react";
import * as S from "./styles";

export type Props = {
  imageUrl?: string;
  text?: string;
};
function CardTopImage({ imageUrl, text }: Props): JSX.Element {
  return (
    <S.Container>
      <S.Image source={{ uri: imageUrl }} />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
}

export default CardTopImage;
