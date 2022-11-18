import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './ChatList.styled';
import React from 'react';
import { useGlobalContext } from '../../../../contexts/globalContext';
import { RoomApi } from '../../../../services/api/room';
import { ClipLoader } from 'react-spinners';

interface IChatList {
  selected: number;
  setSelected: (num: number) => void;
}

const ChatList = ({ selected, setSelected }: IChatList) => {
  const context = useGlobalContext();

  const roomSelect = async (index: number) => {
    const result = await RoomApi.getRoomInfo(
      context.roomList[index].roomInfo._id
    );

    context.setRoomInfo({
      roomName: result.roomName,
      roomInfo: result.roomInfo,
      roomAvatar: result.roomAvatar,
    });
    context.setRoomMsg(result.messages);
    context.setRoomChoosen(true);
  };

  return (
    <S.ChatList>
      <S.Wrapper>
        {context.roomList.length > 0 ? (
          context.roomList.map((data, index) => (
            <React.Fragment key={index}>
              <ChatPreviewItem
                avatar={data.roomAvatar}
                msg={data.roomInfo.lastMsg}
                name={data.roomName}
                id={index}
                active={selected === index}
                setSelected={setSelected}
                onClick={() => roomSelect(index)}
              />
            </React.Fragment>
          ))
        ) : (
          <ClipLoader color='#769FCD' />
        )}
      </S.Wrapper>
    </S.ChatList>
  );
};

export default ChatList;
