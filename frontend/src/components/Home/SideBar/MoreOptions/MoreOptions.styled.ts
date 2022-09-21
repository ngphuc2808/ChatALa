import styled from "styled-components";
import tw from "twin.macro";

export const MoreOptions = styled.div``

export const Wrapper = styled.div`
  ${tw`px-2 py-3 bg-blue-100 absolute rounded-2xl shadow-md z-30`}
  transform: translate(380px,-50px)
`

export const optionItem = styled.div<{color?: string}>`
  ${tw`text-sm px-3 py-2 rounded-2xl cursor-pointer`}
`

export const NormalItem = styled(optionItem)`
  ${tw`hover:bg-blue-200`}
`

export const DeteleItem = styled(optionItem)`
  ${tw`text-red-500 hover:bg-red-50`}
`