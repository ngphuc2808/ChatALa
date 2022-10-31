import Image from 'next/image';
import { useState } from 'react';
import { UserAvatar } from '../../../../utils/dataConfig';
import { messageType } from '../../../../utils/types';
import * as S from './ChatMsg.styled';
import ChatMsgOption from './ChatMsgOption';

interface IChatMsg {
  data: messageType;
  position: string;
}

const ChatMsg = ({ data, position }: IChatMsg) => {
  const [toggleOption, setToggleOption] = useState(false);

  return data.senderId !== '1' ? (
    <S.ChatMsgRight position={position}>
      <S.ChatMsgTextTail />
      <S.ChatMsgTextWrapper>
        <S.ChatMsgText>{data.msg}</S.ChatMsgText>
        <S.ChatMsgMoreIconWrapper>
          <S.ChatMsgMoreIcon onClick={() => setToggleOption(true)} />
          {toggleOption && <ChatMsgOption setToggleOption={setToggleOption} />}
        </S.ChatMsgMoreIconWrapper>
      </S.ChatMsgTextWrapper>
    </S.ChatMsgRight>
  ) : (
    <S.ChatMsgLeft position={position}>
      <S.ChatMsgAvatar position={position}>
        <Image
          src={UserAvatar}
          alt='avatar'
          layout='fill'
          objectFit='contain'
        />
      </S.ChatMsgAvatar>
      <S.ChatMsgTextTail />
      <S.ChatMsgText>{data.msg}</S.ChatMsgText>
    </S.ChatMsgLeft>
  );
};

export default ChatMsg;
