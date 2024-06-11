import UserAvatarIcon from "screens/auth/assets/UserAvatarIcon";
import * as S from "./styles";

type Props = {
  leftImage?: any;
  rightImage?: string;
};
function ImageWithIconOverlay({ leftImage, rightImage }: Props): JSX.Element {
  return (
    <S.Container>
      <S.LeftContainer>
        <S.LeftImageContainer>
          {leftImage ? (
            <S.LeftImage source={{ uri: leftImage }} testID="leftImage" />
          ) : (
            <UserAvatarIcon width={104} height={104} />
          )}
        </S.LeftImageContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <S.RightImage source={{ uri: rightImage }} testID="rightImage" />
      </S.RightContainer>
    </S.Container>
  );
}

export default ImageWithIconOverlay;
