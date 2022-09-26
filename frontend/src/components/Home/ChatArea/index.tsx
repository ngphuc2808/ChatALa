import Image from "next/image";
import * as S from "./ChatArea.styled";
import { ChatMsgArray, UserAvatar, UserName } from "../../../utils/dataConfig";
import { useEffect, useRef } from "react";
import ChatMsg from "./ChatMsg";

const ChatArea = () => {
  const status = 1;
  const message = useRef<HTMLSpanElement>(null);

  return (
    <S.ChatArea>
      <S.ChatAreaHead>
        <S.ChatAreaHeadInfo>
          <S.ChatAreaHeadAvatar>
            <Image src={UserAvatar} alt="avatar" />
          </S.ChatAreaHeadAvatar>
          <S.ChatAreaHeadNameWrapper>
            <S.ChatAreaHeadName>{UserName}</S.ChatAreaHeadName>
            <S.ChatAreaHeadStatus>
              <S.ChatAreaHeadStatusIcon status={status} />
              {status ? "Online" : "Offline"}
            </S.ChatAreaHeadStatus>
          </S.ChatAreaHeadNameWrapper>
        </S.ChatAreaHeadInfo>
        <S.ChatAreaHeadOption />
      </S.ChatAreaHead>
      <S.ChatAreaMain>
        <S.ChatAreaMainMsg>
          {ChatMsgArray.map((data, index) => (
            <ChatMsg msg={data.msg} index={index} key={index} />
          ))}
        </S.ChatAreaMainMsg>
        <S.ChatAreaMainInput>
          <S.ChatAreaMainInputFile>+</S.ChatAreaMainInputFile>
          <S.ChatAreaMainInputMsg>
            <S.ChatAreaMainInputIcon />
            <S.ChatAreaMainInputText
              username={UserName}
              contentEditable
              ref={message}
            />
            <S.ChatAreaMainInputSend />
          </S.ChatAreaMainInputMsg>
        </S.ChatAreaMainInput>
      </S.ChatAreaMain>
    </S.ChatArea>
  );
};

export default ChatArea;
