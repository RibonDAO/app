import { useState } from "react";
import UserAvatarIcon from "screens/auth/assets/UserAvatarIcon";
import {
  LeftImagePlaceholder,
  RightImagePlaceholder,
} from "./ImagePlaceholders";
import * as S from "./styles";

type Props = {
  leftImage?: string;
  rightImage?: string;
};

function ImageWithIconOverlay({ leftImage, rightImage }: Props): JSX.Element {
  const [isLeftImageLoading, setIsLeftImageLoading] = useState(true);
  const [isRightImageLoading, setIsRightImageLoading] = useState(true);

  return (
    <S.Container>
      <S.LeftContainer>
        <S.LeftImageContainer>
          {leftImage && isLeftImageLoading && <LeftImagePlaceholder />}
          {leftImage ? (
            <S.LeftImage
              source={{ uri: leftImage }}
              testID="leftImage"
              onLoad={() => setIsLeftImageLoading(false)}
              onError={() => setIsLeftImageLoading(false)}
            />
          ) : (
            <UserAvatarIcon width={104} height={104} />
          )}
        </S.LeftImageContainer>
      </S.LeftContainer>
      <S.RightContainer>
        {isRightImageLoading && <RightImagePlaceholder />}
        <S.RightImage
          source={{ uri: rightImage }}
          testID="rightImage"
          onLoad={() => setIsRightImageLoading(false)}
          onError={() => setIsRightImageLoading(false)}
        />
      </S.RightContainer>
    </S.Container>
  );
}

export default ImageWithIconOverlay;
