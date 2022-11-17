import { NotiListArray } from '../../../../../utils/dataConfig';
import * as S from './ShowFriends.styled';
import Image from 'next/image';

interface IShowFriends {
  setToggleShowFriends: (toggle: boolean) => void;
}

const ShowFriends = ({ setToggleShowFriends }: IShowFriends) => {
  return (
    <S.ShowFriendsModal>
      <S.ShowFriendsOverlay onClick={() => setToggleShowFriends(false)} />
      <S.ShowFriendsBody>
        <S.ShowFriendsTitle>Your Friends</S.ShowFriendsTitle>
        <S.ShowFriendsSearch>
          <S.ShowFriendsSearchIcon />
          <S.ShowFriendsSearchInput placeholder='Search with name or phone number...' />
        </S.ShowFriendsSearch>
        <S.GreateGroupList>
          {NotiListArray.map((data, index) => (
            <S.ShowFriendsItem key={index}>
              <S.ShowFriendsInfo>
                <S.ShowFriendsAvatar>
                  <Image
                    src={data.avatar}
                    alt='avatar'
                    layout='fill'
                    objectFit='cover'
                  />
                </S.ShowFriendsAvatar>
                <S.ShowFriendsName>{data.name}</S.ShowFriendsName>
              </S.ShowFriendsInfo>
            </S.ShowFriendsItem>
          ))}
        </S.GreateGroupList>
      </S.ShowFriendsBody>
    </S.ShowFriendsModal>
  );
};

export default ShowFriends;
