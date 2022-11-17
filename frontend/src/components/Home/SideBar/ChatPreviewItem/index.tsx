import Image from 'next/image';
import * as S from './ChatPreviewItem.styled';

interface IChatPreviewItem {
  avatar?: string;
  active: boolean;
  msg: string;
  name?: string;
  id: number;
  setSelected: (id: number) => void;
  onClick: () => void;
}

const ChatPreviewItem = ({
  avatar,
  msg,
  name = 'Chat Bot',
  active,
  id,
  setSelected,
  onClick,
}: IChatPreviewItem) => {
  const status = 1;

  return (
    <S.ChatPreviewItem active={active} Id={id} onClick={onClick}>
      <S.Wrapper onClick={() => setSelected(id)}>
        <S.ChatAvatarWrapper>
          {avatar ? (
            <>
              <S.ChatAvatar>
                <Image
                  src={avatar}
                  alt='avatar'
                  layout='fill'
                  objectFit='cover'
                />
              </S.ChatAvatar>
              <S.ChatStatus status={status} />
            </>
          ) : (
            <S.ChatBotAvatar />
          )}
        </S.ChatAvatarWrapper>
        <S.Content>
          <S.Name>{name}</S.Name>
          <S.Msg>{msg}</S.Msg>
        </S.Content>
      </S.Wrapper>
    </S.ChatPreviewItem>
  );
};

export default ChatPreviewItem;
