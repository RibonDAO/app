import VerifiedIcon from "components/vectors/VerifiedIcon";
import Sparkles from "screens/promoters/ClubScreen/Header/assets/Sparkles";
import * as S from "./styles";
import ProfilePhoto from "../assets/ProfilePhoto";

type Props = {
  userAvatar?: string;
  email?: string;
  name?: string | null;
  showInfo?: boolean;
  isClubMember?: boolean;
};
function UserAvatar({
  userAvatar,
  email,
  name,
  showInfo = true,
  isClubMember,
}: Props) {
  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        {userAvatar ? (
          <S.Avatar source={{ uri: userAvatar }} alt="user-avatar" />
        ) : (
          <ProfilePhoto />
        )}

        {isClubMember && (
          <S.VerifiedContainer>
            <VerifiedIcon />
          </S.VerifiedContainer>
        )}

        {isClubMember && (
          <S.Sparkles>
            <Sparkles />
          </S.Sparkles>
        )}
      </S.AvatarContainer>

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
