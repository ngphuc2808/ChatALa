import Image from "next/image";
import { useState } from "react";
import { CreateGroupArray } from "../../../../../utils/dataConfig";
import * as S from "./CreateGroup.styled";

interface ICreateGroup {
  setToggleCreateGroup: (toggle: boolean) => void;
}

type addUser = {
  uid: string;
  name: string;
  avatar: string;
};

const CreateGroup = ({ setToggleCreateGroup }: ICreateGroup) => {
  const [addedUsers, setAddedUsers] = useState<addUser[]>([]);

  const addUserToGroup = (data: addUser) => {
    if (addedUsers.every((user) => user.uid !== data.uid)) {
      setAddedUsers([...addedUsers, data]);
    }
  };

  const removeUserToGroup = (index: number) => {
    const temp = addedUsers;
    temp.splice(index, 1);
    setAddedUsers([...temp]);
  };

  const createGroup = () => {
    console.log(addedUsers);
  }

  return (
    <S.CreateGroupModal>
      <S.CreateGroupOverlay onClick={() => setToggleCreateGroup(false)} />
      <S.CreateGroupBody>
        <S.CreateGroupTitle>Creating Group Chat</S.CreateGroupTitle>
        <S.CreateGroupSearch>
          <S.CreateGroupSearchIcon />
          <S.CreateGroupSearchInput placeholder="Search with name or phone number..." />
        </S.CreateGroupSearch>
        {addedUsers.length > 0 && <S.CreateGroupAddedUsers>
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
          <S.CreateGroupSubmit onClick={createGroup}>Create</S.CreateGroupSubmit>
        </S.CreateGroupAddedUsers>}
        <S.GreateGroupList>
          {CreateGroupArray.map((data, index) => (
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
              <S.CreateGroupOption onClick={() => addUserToGroup(data)}>
                Add
              </S.CreateGroupOption>
            </S.CreateGroupItem>
          ))}
        </S.GreateGroupList>
      </S.CreateGroupBody>
    </S.CreateGroupModal>
  );
};

export default CreateGroup;
