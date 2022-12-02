import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriendListState } from "../../../../../features/redux/slices/friendListSlice";
import { roomListActions } from "../../../../../features/redux/slices/roomListSlice";
import { RoomApi } from "../../../../../services/api/room";
import { CreateGroupArray } from "../../../../../utils/dataConfig";
import { userInfo } from "../../../../../utils/types";
import * as S from "./CreateGroup.styled";

interface ICreateGroup {
  setToggleCreateGroup: (toggle: boolean) => void;
}

type userToAdd = {
  uid: string;
  nickname: string;
  avatar: string;
};

const CreateGroup = ({ setToggleCreateGroup }: ICreateGroup) => {
  const dispatch = useDispatch();

  const [addedUsers, setAddedUsers] = useState<userInfo[]>([]);

  const friends = useSelector(selectFriendListState);

  const addUserToGroup = (data: userInfo) => {
    if (addedUsers.every((user) => user._id !== data._id)) {
      setAddedUsers([...addedUsers, data]);
    }
  };

  const removeUserToGroup = (index: number) => {
    const temp = addedUsers;
    temp.splice(index, 1);
    setAddedUsers([...temp]);
  };

  const createGroup = async () => {
    if (addedUsers.length > 1) {
      const users: userToAdd[] = [];
      addedUsers.forEach((user) => {
        users.push({
          uid: user._id,
          nickname: user.name,
          avatar: user.avatar,
        });
      });

      try {
        const createdRoom = await RoomApi.createGroup(users);
        if (createdRoom) {
          const rooms = await RoomApi.getRoomList();
          dispatch(roomListActions.setRoomList(rooms.result));
          setToggleCreateGroup(false)
        }
      } catch (err: any) {
        console.log(err);
        if (err.errors?.error.statusCode === 400) {
          alert(err.errors.message);
        }
      }
    } else {
      alert("Cannot create group with 2 member!");
    }
  };

  return (
    <S.CreateGroupModal>
      <S.CreateGroupOverlay onClick={() => setToggleCreateGroup(false)} />
      <S.CreateGroupBody>
        <S.CreateGroupTitle>Creating Group Chat</S.CreateGroupTitle>
        <S.CreateGroupSearch>
          <S.CreateGroupSearchIcon />
          <S.CreateGroupSearchInput placeholder="Search with name or phone number..." />
        </S.CreateGroupSearch>
        {addedUsers.length > 0 && (
          <S.CreateGroupAddedUsers>
            <S.CreateGroupAddedUsersInner>
              {addedUsers.map((data, index) => (
                <S.CreateGroupAddedUser key={index}>
                  <S.CreateGroupAddedUserAvatar>
                    <Image src={data.avatar} layout="fill" />
                  </S.CreateGroupAddedUserAvatar>
                  <S.CreateGroupAddedUserName>
                    {data.name}
                  </S.CreateGroupAddedUserName>
                  <S.CreateGroupAddedUserRemove
                    onClick={() => removeUserToGroup(index)}
                  />
                </S.CreateGroupAddedUser>
              ))}
            </S.CreateGroupAddedUsersInner>
            <S.CreateGroupSubmit onClick={createGroup}>
              Create
            </S.CreateGroupSubmit>
          </S.CreateGroupAddedUsers>
        )}
        <S.GreateGroupList>
          {friends.list.map((data, index) => (
            <S.CreateGroupItem key={index}>
              <S.CreateGroupInfo>
                <S.CreateGroupAvatar>
                  <Image
                    src={data.avatar}
                    alt="avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </S.CreateGroupAvatar>
                <S.CreateGroupName>{data.name}</S.CreateGroupName>
              </S.CreateGroupInfo>
              {addedUsers.some((user) => user._id === data._id) ? (
                <S.CreateGroupAdded>Added</S.CreateGroupAdded>
              ) : (
                <S.CreateGroupAdd onClick={() => addUserToGroup(data)}>
                  Add
                </S.CreateGroupAdd>
              )}
            </S.CreateGroupItem>
          ))}
        </S.GreateGroupList>
      </S.CreateGroupBody>
    </S.CreateGroupModal>
  );
};

export default CreateGroup;
