import VerifiedIcon from "components/vectors/VerifiedIcon";
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
  isBusinessMember = false,
}: Props) {
  const renderSparkles = () => {
    if (!isClubMember) return null;
    return (
      <>
        <S.LeftSparkles>
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

          <S.BusinessIconContainer>
            <S.BusinessIcon source={{ uri: userAvatar }} alt="user-avatar" />
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
