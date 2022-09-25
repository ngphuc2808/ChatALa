import styled from "styled-components";
import tw from "twin.macro";
import { FaCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";

export const ChatArea = styled.div`
  ${tw`bg-[#C9D9E5] rounded-[50px] flex-grow flex flex-col overflow-hidden`}
`;

export const ChatAreaHead = styled.div`
  ${tw`flex justify-between items-center py-1.5 px-7`}
`;

export const ChatAreaHeadInfo = styled.div`
  ${tw`flex items-center cursor-default`}
`;

export const ChatAreaHeadAvatar = styled.figure`
  ${tw`w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;
export const ChatAreaHeadNameWrapper = styled.div`
  ${tw`ml-3.5`}
`;

export const ChatAreaHeadName = styled.div`
  ${tw`font-semibold text-[22px]`}
`;

export const ChatAreaHeadStatus = styled.div`
  ${tw`text-[#434343] text-[20px] flex items-center gap-1.5`}
`;

export const ChatAreaHeadStatusIcon = styled(FaCircle)<{ status: number }>`
  ${tw`mt-[-2px] text-[15px]`}
  ${({ status }) => (status === 1 ? `color: #04BF00` : `color: #BF0000`)}
`;

export const ChatAreaHeadOption = styled(IoMenu)`
  ${tw`text-[40px] text-[#00529D] hover:cursor-pointer`}
`;

export const ChatAreaMain = styled.div`
  ${tw`flex flex-col flex-grow bg-[#5A7FA0] rounded-t-[50px] overflow-hidden px-6 py-4`}
`;

export const ChatAreaMainMsg = styled.div`
  ${tw`flex-grow`}
`;

export const ChatAreaMainInput = styled.div`
  ${tw`flex items-center`}
`;

export const ChatAreaMainInputFile = styled.div`
  ${tw`flex flex-shrink-0 bg-[#A6BBF1] rounded-full w-12 h-12 items-center justify-center text-4xl hover:cursor-pointer hover:opacity-80`}
`;

export const ChatAreaMainInputMsg = styled.div`
  ${tw`flex flex-grow items-center p-1.5 bg-[#DFE2E2] ml-2.5 rounded-[50px] relative`}
`;

export const ChatAreaMainInputIcon = styled(BsEmojiLaughingFill)`
  ${tw`text-[#5A7FA0] text-4xl hover:cursor-pointer hover:text-[#003BD2] transition-colors`}
`;

export const ChatAreaMainInputText = styled.span<{ username: string }>`
  ${tw`flex-grow outline-none bg-transparent text-xl ml-2.5 w-1 overflow-auto max-h-24 whitespace-normal`}

  &:empty::before {
    content: 'Write something to ${({ username }) => username}...';
    ${tw`cursor-text text-gray-400`}
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c9d9e5;
  }
`;

export const ChatAreaMainInputSend = styled(RiSendPlaneFill)`
  ${tw`bg-[#A6BBF1] p-2 rounded-full text-[#002B98] text-4xl hover:cursor-pointer hover:text-[#003BD2] transition-colors text-center ml-2.5`}
`;
