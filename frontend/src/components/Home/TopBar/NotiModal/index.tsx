import * as S from './NotiModal.styled';
import * as React from 'react';
import { NotiListArray } from '../../../../utils/dataConfig';
import Image from 'next/image';
import { useOutsideClick } from '../../../Global/ProcessFunctions';

interface INotiModal {
  setActiveNotiModal: (isActive: boolean) => void;
}

const NotiModal = ({ setActiveNotiModal }: INotiModal) => {
  const handleOutsideClick = () => {
    setActiveNotiModal(false);
  };

  const NotiRef = useOutsideClick(handleOutsideClick);

  return (
    <S.Noti ref={NotiRef}>
      <S.NotiTitles>Friend Requests</S.NotiTitles>
      <S.NotiList>
        {NotiListArray.map((data, index) => (
          <S.NotiItem key={index}>
            <S.NotiInfo>
              <S.NotiAvatar>
                <Image src={data.avatar} alt='avatar' layout='fill' objectFit='cover'/>
              </S.NotiAvatar>
              <S.NotiNameWrapper>
                <S.NotiName>{data.name}</S.NotiName>
                <S.NotiNumFriend>{`${data.numFriends} Friends`}</S.NotiNumFriend>
              </S.NotiNameWrapper>
            </S.NotiInfo>
            <S.NotiAccept>Accept</S.NotiAccept>
            <S.NotiDecline>Decline</S.NotiDecline>
          </S.NotiItem>
        ))}
      </S.NotiList>
    </S.Noti>
  );
};

export default NotiModal;
