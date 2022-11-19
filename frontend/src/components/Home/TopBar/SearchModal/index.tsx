import * as S from './SearchModal.styled';
import * as React from 'react';
import { SearchListArray } from '../../../../utils/dataConfig';
import Image from 'next/image';
import { useOutsideClick } from '../../../Global/ProcessFunctions';
import { SearchResult } from '../../../../utils/types';
import { FriendApi } from '../../../../services/api/friend';

interface ISearchModalModal {
  setSearchModal: (isActive: boolean) => void;
  searchResult: SearchResult[];
  setAction: (isActive: boolean) => void;
}

const SearchModal = ({
  searchResult,
  setSearchModal,
  setAction,
}: ISearchModalModal) => {
  const handleOutsideClick = () => {
    setSearchModal(false);
  };

  const SearchModalRef = useOutsideClick(handleOutsideClick);

  const friendRequest = async (id: string) => {
    try {
      const res = await FriendApi.friendRequest(id);
      setAction(true);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.SearchModal ref={SearchModalRef}>
      <S.SearchModalList>
        {searchResult.length ? (
          searchResult.map((data, index) => (
            <S.SearchModalItem key={index}>
              <S.SearchModalInfo>
                <S.SearchModalAvatar>
                  <Image
                    src={data.avatar}
                    alt='avatar'
                    layout='fill'
                    objectFit='cover'
                  />
                </S.SearchModalAvatar>
                <S.SearchModalNameWrapper>
                  <S.SearchModalName>{data.name}</S.SearchModalName>
                  <S.SearchModalNumFriend>{`${data.createdAt} Friends`}</S.SearchModalNumFriend>
                </S.SearchModalNameWrapper>
              </S.SearchModalInfo>
              {data.status === 'friend' ? (
                <S.SearchModalMessage>Message</S.SearchModalMessage>
              ) : data.status === 'receive' ? (
                <S.SearchModalPending>Accept</S.SearchModalPending>
              ) : data.status === 'request' ? (
                <S.SearchModalPending>Pending</S.SearchModalPending>
              ) : (
                <S.SearchModalAddFriend onClick={() => friendRequest(data._id)}>
                  Add Friend
                </S.SearchModalAddFriend>
              )}
            </S.SearchModalItem>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </S.SearchModalList>
    </S.SearchModal>
  );
};

export default SearchModal;
