import * as S from "./styles";
import ProfilePhoto from "../assets/ProfilePhoto";

type Props = {
  userAvatar?: string;
  email?: string;
  name?: string | null;
  showInfo?: boolean;
};
function UserAvatar({ userAvatar, email, name, showInfo = true }: Props) {
  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        {userAvatar ? (
          <S.Avatar source={{ uri: userAvatar }} alt="user-avatar" />
        ) : (
          <ProfilePhoto />
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
