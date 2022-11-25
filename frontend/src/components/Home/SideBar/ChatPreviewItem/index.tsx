import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectRoomListState } from '../../../../features/redux/slices/roomListSlice';
import * as S from './ChatPreviewItem.styled';

interface IChatPreviewItem {
  avatar?: string;
  active: boolean;
  msg: string;
  name?: string;
  index: number;
  setRoomSelected: (id: number) => void;
  onClick: () => void;
}

const ChatPreviewItem = ({
  avatar,
  msg,
  name = 'Chat Bot',
  active,
  index,
  setRoomSelected,
  onClick,
}: IChatPreviewItem) => {

  const roomList = useSelector(selectRoomListState);

  return (
    <S.ChatPreviewItem active={active} Id={index} onClick={onClick}>
      <S.Wrapper onClick={() => setRoomSelected(index)}>
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
              {!roomList.list[index].roomInfo.isGroup && <S.ChatStatus status={roomList.activeList[index]} />}
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
