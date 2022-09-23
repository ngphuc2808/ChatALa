import styled from "styled-components";
import tw from "twin.macro";

export const ChatAvatar = styled.figure`
  ${tw`w-[55px] h-[55px] rounded-full overflow-hidden`}
  border: 2px solid black;
`;
export const Content = styled.div`
  ${tw`ml-3.5`}
`;

export const Name = styled.div`
  ${tw`font-semibold text-[18px]`}
`;

export const Msg = styled.div`
  ${tw`text-[#434343] text-[16px]`}
`;

export const Wrapper = styled.div<{ bgColor?: string }>`
  ${tw`flex px-3 py-2.5 items-center relative w-full`}
`;

export const ChatPreviewItem = styled.div<{ bgColor?: string }>`
  ${tw`flex items-center relative hover:cursor-pointer hover:bg-[#d2daff] rounded-[50px]`}
  ${({ bgColor }) => bgColor && `background-color: ${bgColor}`}
`;
