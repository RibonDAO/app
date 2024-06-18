import ProfilePhoto from "screens/users/ImpactScreen/ProfileSection/assets/ProfilePhoto";
import * as S from "./styles";

type Props = {
  leftImage?: string;
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
            <S.AvatarContainer>
              <ProfilePhoto width={104} height={104} />
            </S.AvatarContainer>
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
