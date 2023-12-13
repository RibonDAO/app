import * as S from "./styles";
import Avatar from "../assets/Avatar";

type Props = {
  userAvatar?: string;
  email?: string;
  name?: string | null;
};
function UserAvatar({ userAvatar, email, name }: Props) {
  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        {userAvatar ? (
          <S.Avatar source={{ uri: userAvatar }} alt="user-avatar" />
        ) : (
          <Avatar />
        )}
      </S.AvatarContainer>
      <S.ProfileSection>
        <S.Username>{name}</S.Username>
        <S.Email>{email}</S.Email>
      </S.ProfileSection>
    </S.AvatarSection>
  );
}

export default UserAvatar;
