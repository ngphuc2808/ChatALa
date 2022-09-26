import styled from "styled-components";
import tw from "twin.macro";

export const ChatMsg = styled.div`
  ${tw`flex items-end my-3`}
`;

export const ChatMsgText = styled.div`
  ${tw`rounded-2xl px-3 py-2 max-w-[70%]`}
`;

export const ChatMsgLeft = styled(ChatMsg)`
  ${ChatMsgText} {
    ${tw`bg-[#DFE2E2] ml-2`}
  }
`;

export const ChatMsgRight = styled(ChatMsg)`
  ${tw`flex-row-reverse`}
  ${ChatMsgText} {
    ${tw`bg-[#82E8FF] mr-2`}
  }
`;

export const ChatMsgAvatar = styled.figure`
  ${tw`w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0 mb-[-5px]`}
  border: 2px solid black;
`;

// sender: 82E8FF
// receiver: DFE2E2
