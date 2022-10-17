import styled from 'styled-components';
import tw from 'twin.macro';

export const ChatAvatar = styled.figure`
  ${tw`relative w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;
export const Content = styled.div`
  ${tw`ml-3.5 overflow-hidden`}
`;

export const Name = styled.div`
  ${tw`font-semibold text-[18px]`}
`;

export const Msg = styled.div`
  ${tw`text-[#434343] text-[16px] w-full overflow-hidden whitespace-nowrap`}
  text-overflow: ellipsis;
`;

export const Wrapper = styled.div`
  ${tw`flex px-3 py-2.5 items-center relative w-full`}
`;

export const ChatPreviewItem = styled.div<{ active?: boolean; Id?: number }>`
  ${tw`flex items-center relative hover:cursor-pointer hover:bg-[#d2daff] rounded-[20px]`}
  ${({ active }) => active && tw`bg-[#AAC4FF]`}
  ${({ Id }) => (Id !== -2 ? tw`my-1` : tw`bg-[#B1B2FF]`)}
`;
