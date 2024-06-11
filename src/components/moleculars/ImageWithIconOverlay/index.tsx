import * as S from "./styles";

type Props = {
  leftImage?: string;
  rightImage?: string;
};
function ImageWithIconOverlay({ leftImage, rightImage }: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.LeftImage source={{ uri: leftImage }} testID="leftImage" />
      </S.LeftContainer>
      <S.RightContainer>
        <S.RightImage source={{ uri: rightImage }} testID="rightImage" />
      </S.RightContainer>
    </S.Container>
  );
}

export default ImageWithIconOverlay;
