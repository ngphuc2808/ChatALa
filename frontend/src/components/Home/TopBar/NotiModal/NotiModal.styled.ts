import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { fadeIn } from "react-animations";

export const NotiModal = styled.div`
  ${tw`fixed top-0 left-0 bottom-0 right-0 z-30`}
`;

export const NotiOverlay = styled.div`
  ${tw`absolute bg-[#00000080] h-full w-full`}
`;

const fadeInAnimate = keyframes`${fadeIn}`;

export const NotiBody = styled.div`
  ${tw`bg-[#ECF2F7] flex flex-col py-2.5 px-3.5 rounded-[25px] absolute shadow-md right-32 top-20`}
  animation: 1s ${fadeInAnimate}
`;

export const NotiTitles = styled.div`
  ${tw`rounded-[50px] text-white text-lg font-semibold bg-[#7199BA] px-8 py-1.5 mb-1.5`}
  width: fit-content;
`;

export const NotiList = styled.div`
  ${tw``}
`;

export const NotiItem = styled.div`
  ${tw`flex p-2 rounded-[50px] my-1.5 items-center relative w-full bg-[#AAC4FF]`}
`;

export const NotiInfo = styled.div`
  ${tw`flex items-center hover:cursor-pointer`}
`;

export const NotiAvatar = styled.figure`
  ${tw`w-[55px] h-[55px] rounded-full overflow-hidden flex-shrink-0`}
  border: 2px solid black;
`;
export const NotiNameWrapper = styled.div`
  ${tw`ml-3.5`}
`;

export const NotiName = styled.div`
  ${tw`font-semibold text-[18px] w-[175px]`}
`;

export const NotiNumFriend = styled.div`
  ${tw`text-[#434343] text-[16px]`}
`;

export const NotiOption = styled.div`
  ${tw`text-white rounded-[50px] font-semibold text-sm px-5 py-2.5 ml-1 hover:cursor-pointer hover:opacity-80`}
`;

export const NotiAccept = styled(NotiOption)`
  ${tw`bg-[#2374E1]`}
`;

export const NotiCancel = styled(NotiOption)`
  ${tw`bg-[#4E4F50]`}
`;
