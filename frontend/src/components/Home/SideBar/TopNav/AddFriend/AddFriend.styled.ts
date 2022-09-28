import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import {zoomIn} from 'react-animations'

export const AddFriendModal = styled.div`
  ${tw`flex fixed top-0 left-0 bottom-0 right-0 z-30`}
`;

export const AddFriendOverlay = styled.div`
  ${tw`absolute bg-[#00000080] h-full w-full`}
`;

const fadeInAnimate = keyframes`${zoomIn}`;

export const AddFriendBody = styled.div`
  ${tw`m-auto bg-[#7199BA] py-2.5 px-3.5 rounded-[25px]`}
  animation: 0.5s ${fadeInAnimate}
`;
