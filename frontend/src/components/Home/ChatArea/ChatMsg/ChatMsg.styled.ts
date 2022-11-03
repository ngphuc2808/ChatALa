import styled from 'styled-components';
import tw from 'twin.macro';
import { FiMoreHorizontal } from 'react-icons/fi';

export const ChatMsg = styled.div`
  ${tw`flex items-end mb-1`}
`;

export const ChatMsgText = styled.div`
  ${tw`relative px-3 py-2 max-w-[70%]`}
`;

export const ChatMsgTextTail = styled.div`
  ${tw`absolute w-[30px] h-[30px] rounded-full`}
  &:before {
    ${tw`bg-dark`}
  }
`;

export const ChatMsgAvatar = styled.figure<{ position: string }>`
  ${tw`relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 mb-[-5px] z-10 invisible`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`visible`}
  border: 2px solid black;
`;

export const ChatMsgMoreIcon = styled(FiMoreHorizontal)`
  ${tw`relative mr-3.5 text-[20px] text-gray-600 cursor-pointer`}
  visibility: hidden;
`;

export const ChatMsgMoreIconWrapper = styled.div`
  ${tw`relative`}
`;

export const ChatMsgTextWrapper = styled.div`
  ${tw`relative flex items-center w-full`}

  &:hover {
    ${ChatMsgMoreIcon} {
      visibility: visible;
    }
  }
`;

export const ChatMsgFiles = styled.div`
  ${tw``}
`;

export const ChatMsgFileImages = styled.div`
  ${tw`flex ml-[48px] w-[500px] min-h-[400px] mb-1 `}
`;

export const ChatMsgFileImage = styled.figure`
  ${tw`relative bg-primary w-full rounded-2xl hover:cursor-pointer overflow-hidden`}
`;

export const ChatMsgFile = styled.div`
  ${tw``}
`;

export const ChatMsgUnSend = styled.div`
  ${tw`border-2 py-2 px-2.5`}
`;

export const ChatMsgLeftWrapper = styled.div`
  ${tw`flex flex-col`}
`;

export const ChatMsgLeft = styled(ChatMsg)<{ position: string }>`
  ${tw`relative`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`mb-5`}

  ${ChatMsgUnSend} {
    ${tw`ml-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-bl-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-bl-none`
        : tw`rounded-r-2xl`}
  }
  ${ChatMsgText} {
    ${tw`bg-primary ml-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-bl-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-bl-none`
        : tw`rounded-r-2xl`}
  }
  ${ChatMsgTextTail} {
    ${({ position }) =>
      position !== 'bottom' && position !== 'alone' && tw`invisible`}
    ${tw`bg-primary bottom-[-5px] left-[30px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] left-[-28px] bottom-[-3px]`}
      content: '';
  }
`;

export const ChatMsgRight = styled(ChatMsg)<{ position: string }>`
  ${tw`relative flex-row-reverse`}
  ${({ position }) =>
    (position === 'bottom' || position === 'alone') && tw`mb-5`}

  ${ChatMsgUnSend} {
    ${tw`mr-2`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-br-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-br-none`
        : tw`rounded-l-2xl`}
  }
  ${ChatMsgTextWrapper} {
    ${tw`flex flex-row-reverse`}
  }
  ${ChatMsgText} {
    ${tw`bg-darker mr-2 rounded-br-[0] max-w-[75%]`}
    ${({ position }) =>
      position === 'alone'
        ? tw`rounded-2xl rounded-br-none`
        : position === 'top'
        ? tw`rounded-2xl rounded-br-none`
        : tw`rounded-l-2xl`}
  }
  ${ChatMsgTextTail} {
    ${({ position }) =>
      position !== 'bottom' && position !== 'alone' && tw`invisible`}
    ${tw`bg-darker bottom-[-5px] right-[-8px]`}
    &::before {
      ${tw`rounded-full absolute h-[50px] w-[50px] right-[-28px] bottom-[-3px]`}
      content: '';
    }
  }
`;

// sender: 82E8FF
// receiver: DFE2E2
