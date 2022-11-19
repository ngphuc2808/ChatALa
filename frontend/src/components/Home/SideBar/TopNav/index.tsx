import ChatPreviewItem from '../ChatPreviewItem';
import * as S from './TopNav.styled';
import { useState } from 'react';
import CreateGroup from './CreateGroup';
import ShowFriends from './ShowFriends';
import { useDispatch } from 'react-redux';
import { roomInfoActions } from '../../../../features/redux/slices/roomInfoSlice';

interface ITopNav {
  setSelected: (number: number) => void;
}

const TopNav = ({ setSelected }: ITopNav) => {
  const [toggleCreateGroup, setToggleCreateGroup] = useState(false);
  const [toggleShowFriends, setToggleShowFriends] = useState(false);

  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <S.Options>
        <S.FriendsOption onClick={() => setToggleShowFriends(true)} />
        <S.AddGroupOption onClick={() => setToggleCreateGroup(true)} />
      </S.Options>
      <ChatPreviewItem
        id={-2}
        active={false}
        msg='Halo halo niece and nephew, today uncle Roger'
        setSelected={setSelected}
        onClick={() => dispatch(roomInfoActions.clearRoomInfo(null))}
      />
      {toggleCreateGroup && (
        <CreateGroup setToggleCreateGroup={setToggleCreateGroup} />
      )}
      {toggleShowFriends && (
        <ShowFriends setToggleShowFriends={setToggleShowFriends} />
      )}
    </S.Wrapper>
  );
};

export default TopNav;
