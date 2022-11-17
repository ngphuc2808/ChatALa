import * as S from './SearchModal.styled';
import * as React from 'react';
import { SearchListArray } from '../../../../utils/dataConfig';
import Image from 'next/image';
import { useOutsideClick } from '../../../Global/ProcessFunctions';

interface ISearchModalModal {
  setSearchModal: (isActive: boolean) => void;
}

const SearchModal = ({ setSearchModal }: ISearchModalModal) => {
  const handleOutsideClick = () => {
    setSearchModal(false);
  };

  const SearchModalRef = useOutsideClick(handleOutsideClick);

  return (
    <S.SearchModal ref={SearchModalRef}>
      <S.SearchModalList>
        {SearchListArray.map((data, index) => (
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
                <S.SearchModalNumFriend>{`${data.numFriends} Friends`}</S.SearchModalNumFriend>
              </S.SearchModalNameWrapper>
            </S.SearchModalInfo>
            {data.isFriend ? (
              <S.SearchModalMessage>Message</S.SearchModalMessage>
            ) : data.isPending ? (
              <S.SearchModalPending>Pending</S.SearchModalPending>
            ) : (
              <S.SearchModalAddfriend>Add Friend</S.SearchModalAddfriend>
            )}
          </S.SearchModalItem>
        ))}
      </S.SearchModalList>
    </S.SearchModal>
  );
};

export default SearchModal;
