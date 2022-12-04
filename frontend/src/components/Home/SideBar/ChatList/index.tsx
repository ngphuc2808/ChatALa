import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './ChatList.styled';
import React from 'react';
import { RoomApi } from '../../../../services/api/room';
import { ClipLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoomListState } from '../../../../features/redux/slices/roomListSlice';
import { roomInfoActions } from '../../../../features/redux/slices/roomInfoSlice';
import { messageActions } from '../../../../features/redux/slices/messageSlice';

interface IChatList {
  roomSelected: number;
  setRoomSelected: (num: number) => void;
}

const ChatList = ({ roomSelected, setRoomSelected }: IChatList) => {
  const roomList = useSelector(selectRoomListState);
  const dispatch = useDispatch();

  const roomSelect = async (index: number) => {
    if (roomSelected !== index) {
      // dispatch(roomInfoActions.requestRoomInfo(null));

      const result = await RoomApi.getRoomInfo(
        roomList.list[index].roomInfo._id
      );

      dispatch(
        roomInfoActions.setRoomInfo({
          roomName: result.roomName,
          roomInfo: result.roomInfo,
          roomAvatar: result.roomAvatar,
        })
      );

      dispatch(messageActions.setMessage(result.messages));
    }
  };

  return (
    <S.ChatList>
      <S.Wrapper>
        {roomList.list.length > 0 ? (
          roomList.list.map((data, index) => (
            <React.Fragment key={index}>
              <ChatPreviewItem
                avatar={data.roomAvatar}
                msg={data.roomInfo.lastMsg}
                name={data.roomName}
                index={index}
                active={roomSelected === index}
                setRoomSelected={setRoomSelected}
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
