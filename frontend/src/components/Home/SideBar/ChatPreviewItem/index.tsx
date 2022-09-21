import Image from "next/image";
import { shorterText } from "../../../Global/ProcessFunctions";
import * as S from "./ChatPreviewItem.styled";
import { VscHubot } from "react-icons/vsc";

interface IChatPreviewItem {
  avatar?: any;
  bgColor?: string;
  msg: string;
  name?: string;
  id: number;
  setActiveModal?: (id: number) => void;
  setSelected?: (id: number) => void;
}

const ChatPreviewItem = ({
  avatar,
  msg,
  name = "Chat Bot",
  bgColor,
  id,
  setActiveModal,
  setSelected,
}: IChatPreviewItem) => {
  return (
    <>
      <S.ChatPreviewItem bgColor={bgColor}>
        <S.Wrapper onClick={() => setSelected && setSelected(id)}>
          {avatar ? (
            <S.ChatAvatar>
              <Image src={avatar} alt="avatar" />
            </S.ChatAvatar>
          ) : (
            <VscHubot size={55} />
          )}
          <S.Content>
            <S.Name>{name}</S.Name>
            <S.Msg>{shorterText(msg)}</S.Msg>
          </S.Content>
        </S.Wrapper>
        {avatar && (
          <S.MoreIcon onClick={() => setActiveModal && setActiveModal(id)} />
        )}
      </S.ChatPreviewItem>
    </>
  );
};

export default ChatPreviewItem;
