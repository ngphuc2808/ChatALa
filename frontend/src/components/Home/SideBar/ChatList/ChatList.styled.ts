import styled from "styled-components";
import tw from "twin.macro";

export const Wrapper = styled.div`
  ${tw`flex-grow overflow-y-scroll mt-2.5`}

  &::-webkit-scrollbar-track {
    background-color: #ECF2F7;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #C9D9E5
  }
`

export const ChatPreviewItem = styled.div`
  ${tw`relative`}
`;