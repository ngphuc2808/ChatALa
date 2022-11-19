import * as S from './SearchModal.styled';
import * as React from 'react';
import { SearchListArray } from '../../../../utils/dataConfig';
import Image from 'next/image';
import { useOutsideClick } from '../../../Global/ProcessFunctions';
import { SearchResult } from '../../../../utils/types';

interface ISearchModalModal {
  setSearchModal: (isActive: boolean) => void;
  searchResult: SearchResult[];
}

const SearchModal = ({ searchResult, setSearchModal }: ISearchModalModal) => {
  const handleOutsideClick = () => {
    setSearchModal(false);
  };

  const SearchModalRef = useOutsideClick(handleOutsideClick);

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
                <S.SearchModalAddfriend>Add Friend</S.SearchModalAddfriend>
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
