import Image from 'next/image';
import { NotiListArray } from '../../../../../utils/dataConfig';
import * as S from './CreateGroup.styled';

interface ICreateGroup {
  setToggleCreateGroup: (toggle: boolean) => void;
}

const CreateGroup = ({ setToggleCreateGroup }: ICreateGroup) => {
  return (
    <S.CreateGroupModal>
      <S.CreateGroupOverlay onClick={() => setToggleCreateGroup(false)} />
      <S.CreateGroupBody>
        <S.CreateGroupTitle>Creating Group Chat</S.CreateGroupTitle>
        <S.CreateGroupSearch>
          <S.CreateGroupSearchIcon />
          <S.CreateGroupSearchInput placeholder='Search with name or phone number...' />
        </S.CreateGroupSearch>
        <S.GreateGroupList>
          {NotiListArray.map((data, index) => (
            <S.CreateGroupItem key={index}>
              <S.CreateGroupInfo>
                <S.CreateGroupAvatar>
                  <Image src={data.avatar} alt='avatar' layout='fill' objectFit='cover' />
                </S.CreateGroupAvatar>
                <S.CreateGroupName>{data.name}</S.CreateGroupName>
              </S.CreateGroupInfo>
              <S.CreateGroupOption>Add</S.CreateGroupOption>
            </S.CreateGroupItem>
          ))}
        </S.GreateGroupList>
      </S.CreateGroupBody>
    </S.CreateGroupModal>
  );
};

export default CreateGroup;
