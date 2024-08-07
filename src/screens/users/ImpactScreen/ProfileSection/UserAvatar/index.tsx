import VerifiedIcon from "components/vectors/VerifiedIcon";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";
import ProfilePhoto from "../assets/ProfilePhoto";
import RightSparkle from "./assets/RightSparkle";
import LeftSparkle from "./assets/LeftSparkle";

type Props = {
  userAvatar?: string;
  email?: string;
  name?: string | null;
  showInfo?: boolean;
  isClubMember?: boolean;
  isBusinessMember?: boolean;
};
function UserAvatar({
  userAvatar,
  email,
  name,
  showInfo = true,
  isClubMember,
  isBusinessMember,
}: Props) {
  const { currentUser } = useCurrentUser();
  const renderSparkles = () => {
    if (!isClubMember) return null;
    return (
      <>
        <S.LeftSparkles testID="Sparkles">
          <LeftSparkle />
        </S.LeftSparkles>
        <S.RightSparkles>
          <RightSparkle />
        </S.RightSparkles>
      </>
    );
  };

  const renderAvatar = () =>
    userAvatar ? (
      <S.Avatar source={{ uri: userAvatar }} alt="user-avatar" />
    ) : (
      <ProfilePhoto />
    );

  return (
    <S.AvatarSection>
      {isBusinessMember ? (
        <S.PictureContainer>
          <S.AvatarContainer>{renderAvatar()}</S.AvatarContainer>

          <S.BusinessIconContainer testID="BusinessIcon">
            <S.BusinessIcon source={{ uri: currentUser?.company?.logo }} />
          </S.BusinessIconContainer>

          {renderSparkles()}
        </S.PictureContainer>
      ) : (
        <S.AvatarContainer>
          {renderAvatar()}

          {isClubMember && (
            <S.VerifiedContainer>
              <VerifiedIcon />
            </S.VerifiedContainer>
          )}

          {renderSparkles()}
        </S.AvatarContainer>
      )}

      {showInfo && (
        <S.ProfileSection>
          <S.Username>{name}</S.Username>
          <S.Email>{email}</S.Email>
        </S.ProfileSection>
      )}
    </S.AvatarSection>
  );
}

export default UserAvatar;
