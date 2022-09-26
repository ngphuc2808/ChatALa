import { ChatListArray } from "../../../../utils/dataConfig";
import ChatPreviewItem from "../ChatPreviewItem";
import * as S from "./ChatList.styled";
import React, { Dispatch, SetStateAction } from "react";

interface IChatList {
  selected: number,
  setSelected: Dispatch<SetStateAction<number>>
}

const ChatList = ({selected, setSelected} : IChatList) => {

  return (
    <S.Wrapper>
      {ChatListArray.map((data, index) => (
        <React.Fragment key={index}>
          <ChatPreviewItem
            avatar={data.avatar}
            msg={data.msg}
            name={data.name}
            id={index}
            bgColor={selected === index ? "#AAC4FF" : undefined}
            setSelected={setSelected}
          />
        </React.Fragment>
      ))}
    </S.Wrapper>
  );
};

export default ChatList;
