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

  return data.senderId === '1' ? (
    <>
      <S.ChatMsgRight position={position}>
        {!data.unSend ? (
          <>
            {!data.unSend && <S.ChatMsgTextTail />}
            <S.ChatMsgTextWrapper>
              <S.ChatMsgText>{data.msg}</S.ChatMsgText>
              <S.ChatMsgMoreIconWrapper>
                <S.ChatMsgMoreIcon onClick={() => setToggleOption(true)} />
                {toggleOption && (
                  <ChatMsgOption setToggleOption={setToggleOption} />
                )}
              </S.ChatMsgMoreIconWrapper>
            </S.ChatMsgTextWrapper>
          </>
        ) : (
          <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
        )}
        {data.files.length > 0 && (
          <S.ChatMsgFiles>
            {data.files.map((file, index) =>
              file.type === 'image' ? (
                <S.ChatMsgFileImage key={index}></S.ChatMsgFileImage>
              ) : (
                <S.ChatMsgFile key={index}></S.ChatMsgFile>
              )
            )}
          </S.ChatMsgFiles>
        )}
      </S.ChatMsgRight>
    </>
  ) : (
    <S.ChatMsgLeftWrapper>
      <S.ChatMsgLeft position={position}>
        <S.ChatMsgAvatar position={position}>
          <Image
            src={UserAvatar}
            alt='avatar'
            layout='fill'
            objectFit='contain'
          />
        </S.ChatMsgAvatar>
        {!data.unSend && <S.ChatMsgTextTail />}
        {data.unSend ? (
          <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
        ) : (
          <S.ChatMsgText>{data.msg}</S.ChatMsgText>
        )}
      </S.ChatMsgLeft>
      {data.files.length > 0 && (
        <>
          <S.ChatMsgFileImages>
            {data.files.map(
              (file, index) =>
                file.type === 'image' && (
                  <S.ChatMsgFileImage key={index} onClick={() => console.log(1)}>
                    <Image src={file.url} alt='file' layout='fill' draggable={false}/>
                  </S.ChatMsgFileImage>
                )
            )}
          </S.ChatMsgFileImages>
          {data.files.map(
            (file, index) =>
              file.type === 'file' && (
                <S.ChatMsgFile key={index}></S.ChatMsgFile>
              )
          )}
        </>
      )}
    </S.ChatMsgLeftWrapper>
  );
};

export default ChatMsg;
