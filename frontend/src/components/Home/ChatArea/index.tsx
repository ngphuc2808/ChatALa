import Image from "next/image";
import * as S from "./ChatArea.styled";
import { ChatMsgArray, UserAvatar, UserName } from "../../../utils/dataConfig";
import { useRef, useState } from "react";
import ChatMsg from "./ChatMsg";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import MoreOptions from "./MoreOptions";
import { useOutsideClick } from "../../Global/ProcessFunctions";

const ChatArea = () => {
  const status = 1;
  const message = useRef<HTMLSpanElement>(null);
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [toggleOption, setToggleOption] = useState(false);

  const handleOutsideClick = () => {
    setToggleEmoji(false)
  }

  const EmojiRef = useOutsideClick(handleOutsideClick)

  const EmojiClicked = (emoData: EmojiClickData, e: MouseEvent) => {
    message.current!.innerText = message.current!.innerText + emoData.emoji;
  };

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
        <S.ChatAreaHeadOption onClick={() => setToggleOption(true)} />
      </S.ChatAreaHead>
      {toggleOption && <MoreOptions setToggleOption={setToggleOption} />}
      <S.ChatAreaMain>
        <S.ChatAreaMainMsg>
          <S.ChatAreaMainMsgInner>
            {ChatMsgArray.map((data, index) => (
              <ChatMsg msg={data.msg} index={index} key={index} />
            ))}
          </S.ChatAreaMainMsgInner>
        </S.ChatAreaMainMsg>
        <S.ChatAreaMainInput>
          {toggleEmoji && (
            <S.ChatAreaMainInputEmojiPicker ref={EmojiRef}>
              <EmojiPicker
                skinTonesDisabled={true}
                emojiStyle={EmojiStyle.TWITTER}
                height={400}
                width={400}
                onEmojiClick={EmojiClicked}
              />
            </S.ChatAreaMainInputEmojiPicker>
          )}
          <S.ChatAreaMainInputFile>+</S.ChatAreaMainInputFile>
          <S.ChatAreaMainInputMsg>
            <S.ChatAreaMainInputEmoji
              onClick={() => setToggleEmoji(true)}
            />
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
