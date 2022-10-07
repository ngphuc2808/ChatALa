import Image from "next/image";
import { UserAvatar } from "../../../../utils/dataConfig";
import * as S from "./ChatMsg.styled";

interface IChatMsg {
  msg: String;
  index: number;
}

const ChatMsg = ({ msg, index }: IChatMsg) => {
  return index % 2 === 0 ? (
    <S.ChatMsgLeft>
      <S.ChatMsgAvatar>
        <Image src={UserAvatar} alt="avatar" layout="fill" objectFit="contain" />
      </S.ChatMsgAvatar>
      <S.ChatMsgTextTail />
      <S.ChatMsgText>{msg}</S.ChatMsgText>
    </S.ChatMsgLeft>
  ) : (
    <S.ChatMsgRight>
      <S.ChatMsgAvatar>
        <Image src={UserAvatar} alt="avatar" layout="fill" objectFit="contain" />
      </S.ChatMsgAvatar>
      <S.ChatMsgTextTail />
      <S.ChatMsgText>{msg}</S.ChatMsgText>
    </S.ChatMsgRight>
  );
};

export default ChatMsg;
