import styled from "styled-components";
import tw from "twin.macro";

export const ChatMsg = styled.div`
  ${tw`flex items-end my-5`}
`;

export const ChatMsgText = styled.div`
  ${tw`relative rounded-2xl px-3 py-2 max-w-[70%]`}
`;

export const ChatMsgTextTail = styled.div`
  ${tw`absolute w-[30px] h-[30px] rounded-full`}
`;

export const ChatMsgLeft = styled(ChatMsg)`
  ${tw`relative`}
  ${ChatMsgText} {
    ${tw`bg-[#E6E9EA] ml-2 rounded-bl-[0]`}
  }
  ${ChatMsgTextTail}{
    ${tw`bg-[#E6E9EA] bottom-[-5px] left-[40px]`}
    &::before {
      content: "";
      border-radius: 100%;
      position: absolute;
      background-color: #75A6C2;
      height: 50px;
      width: 50px;
      left: -30px;
      bottom: -3px;
    }
  }
`;

export const ChatMsgRight = styled(ChatMsg)`
  ${tw`relative flex-row-reverse`}
  ${ChatMsgText} {
    ${tw`bg-[#82E8FF] mr-2 rounded-br-[0]`}
  }
  ${ChatMsgTextTail}{
    ${tw`bg-[#82E8FF] bottom-[-5px] right-[40px]`}
    &::before {
      content: "";
      border-radius: 100%;
      position: absolute;
      background-color: #75A6C2;
      height: 50px;
      width: 50px;
      right: -30px;
      bottom: -3px;
    }
  }
`;

export const ChatMsgAvatar = styled.figure`
  ${tw`w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0 mb-[-5px] z-10`}
  border: 2px solid black;
`;

// sender: 82E8FF
// receiver: DFE2E2
