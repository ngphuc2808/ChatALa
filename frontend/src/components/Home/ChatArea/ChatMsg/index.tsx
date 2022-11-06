import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserAvatar } from '../../../../utils/dataConfig';
import { messageType } from '../../../../utils/types';
import { getFileIcon, shorterChars } from '../../../Global/ProcessFunctions';
import * as S from './ChatMsg.styled';
import ChatMsgOption from './ChatMsgOption';

interface IChatMsg {
  data: messageType;
  position: string;
}

const ChatMsg = ({ data, position }: IChatMsg) => {
  const [toggleOption, setToggleOption] = useState(false);
  const [images, setImages] = useState<
    Array<{ name: string; url: string; type: string }>
  >([]);

  const getImageList = () => {
    const _images: Array<{ name: string; url: string; type: string }> = [];
    data.files.forEach((file) => {
      if (file.type === 'image') _images.push(file);
    });
    setImages(_images);
  };

  useEffect(() => {
    getImageList();
  }, [data]);

  return data.senderId === '1' ? (
    <>
      <S.ChatMsgRight position={position}>
        <S.ChatMsgWrapper>
          {!data.unSend && data.files.length === 0 && <S.ChatMsgTextTail />}
          {!data.unSend ? (
            <>
              {data.msg !== '' && (
                <S.ChatMsgTextWrapper>
                  <S.ChatMsgText>{data.msg}</S.ChatMsgText>
                  <S.ChatMsgMoreIconWrapper >
                    <S.ChatMsgMoreIcon onClick={() => setToggleOption(true)} />
                    {toggleOption && (
                      <ChatMsgOption setToggleOption={setToggleOption} />
                    )}
                  </S.ChatMsgMoreIconWrapper>
                </S.ChatMsgTextWrapper>
              )}
              {data.msg === '' && (
                <S.ChatMsgMoreIconWrapper nomsg={true}>
                  <S.ChatMsgMoreIcon nomsg={true} onClick={() => setToggleOption(true)} />
                  {toggleOption && (
                    <ChatMsgOption setToggleOption={setToggleOption} />
                  )}
                </S.ChatMsgMoreIconWrapper>
              )}
              {images?.length > 0 && (
                <S.ChatMsgFileImages imgNum={images?.length}>
                  {images?.map((image, index) => (
                    <S.ChatMsgFileImage key={index} imgNum={images?.length} >
                      <img
                        src={image.url}
                        alt='image'
                        // layout='fill'
                        // objectFit='cover'
                        draggable={false}
                      />
                    </S.ChatMsgFileImage>
                  ))}
                </S.ChatMsgFileImages>
              )}
              {data.files.length > 0 && (
                <S.ChatMsgFiles>
                  {data.files.map(
                    (file, index) =>
                      file.type === 'file' && (
                        <S.ChatMsgFile key={index}>
                          <S.ChatMsgFileIcon>
                            {getFileIcon(file)}
                          </S.ChatMsgFileIcon>
                          <S.ChatMsgFileName>
                            {shorterChars(file.name, 25)}
                          </S.ChatMsgFileName>
                        </S.ChatMsgFile>
                      )
                  )}
                </S.ChatMsgFiles>
              )}
            </>
          ) : (
            <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
          )}
        </S.ChatMsgWrapper>
      </S.ChatMsgRight>
    </>
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
      <S.ChatMsgWrapper>
        {!data.unSend && data.files.length === 0 && <S.ChatMsgTextTail />}
        {data.unSend ? (
          <S.ChatMsgUnSend>Message has been recovered</S.ChatMsgUnSend>
        ) : (
          <>
            <S.ChatMsgText>{data.msg}</S.ChatMsgText>
            {images?.length > 0 && (
              <S.ChatMsgFileImages imgNum={images?.length}>
                {images?.map((image, index) => (
                  <S.ChatMsgFileImage key={index} imgNum={images?.length}>
                    <img
                      src={image.url}
                      alt='image'
                      // layout='fill'
                      // objectFit='cover'
                      draggable={false}
                    />
                  </S.ChatMsgFileImage>
                ))}
              </S.ChatMsgFileImages>
            )}
            {data.files.length > 0 && (
              <S.ChatMsgFiles>
                {data.files.map(
                  (file, index) =>
                    file.type === 'file' && (
                      <S.ChatMsgFile key={index}>
                        <S.ChatMsgFileIcon>
                          {getFileIcon(file)}
                        </S.ChatMsgFileIcon>
                        <S.ChatMsgFileName>
                          {shorterChars(file.name, 25)}
                        </S.ChatMsgFileName>
                      </S.ChatMsgFile>
                    )
                )}
              </S.ChatMsgFiles>
            )}
          </>
        )}
      </S.ChatMsgWrapper>
    </S.ChatMsgLeft>

    // {data.files.map(
    //   (file, index) =>
    //     file.type === 'file' && <S.ChatMsgFile key={index}></S.ChatMsgFile>
    // )}
  );
};

export default ChatMsg;
