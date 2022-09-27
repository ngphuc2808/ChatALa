import Image from "next/image";
import * as S from "./ChatArea.styled";
import { ChatMsgArray, UserAvatar, UserName } from "../../../utils/dataConfig";
import { useRef, useState } from "react";
import ChatMsg from "./ChatMsg";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";

const ChatArea = () => {
  const status = 1;
  const message = useRef<HTMLSpanElement>(null);
  const [toggleEmoji, setToggleEmoji] = useState(false);

  const EmojiClicked = (emoData: EmojiClickData, e: MouseEvent) => {
    message.current!.innerText = message.current!.innerText + emoData.emoji
    console.log(emoData.unified, emoData.emoji);
  }

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
          {toggleEmoji && (
            <S.ChatAreaMainInputEmojiPicker>
              <EmojiPicker
                skinTonesDisabled={true}
                emojiStyle={EmojiStyle.FACEBOOK}
                height={400}
                width={300}
                onEmojiClick={EmojiClicked}
              />
            </S.ChatAreaMainInputEmojiPicker>
          )}
          <S.ChatAreaMainInputFile>+</S.ChatAreaMainInputFile>
          <S.ChatAreaMainInputMsg>
            <S.ChatAreaMainInputEmoji
              onClick={() => setToggleEmoji(!toggleEmoji)}
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
