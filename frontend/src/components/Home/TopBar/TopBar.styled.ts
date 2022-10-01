import styled from "styled-components";
import tw from "twin.macro";
import { BiSearchAlt } from "react-icons/bi";
import { RiSettings3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoNotificationsCircleSharp } from "react-icons/io5";

export const Avatar = styled.figure`
  ${tw`w-[75px] h-[75px] rounded-full overflow-hidden absolute shadow-md`}
  border: 5px solid #77d1bc;
`;

export const Container = styled.div`
  ${tw`w-full flex items-center mb-4`}
`;

export const Wrapper = styled.div`
  ${tw`bg-[#C9D9E5] w-full rounded-[50px] flex shadow-md`}
`;

export const LeftWrapper = styled.div`
  ${tw`flex items-center relative cursor-pointer`}
`;

export const RightWrapper = styled.div`
  ${tw`flex flex-grow justify-between`}
`;

export const UserName = styled.div`
  ${tw`self-stretch flex items-center max-w-6xl w-[400px] flex-shrink-0 pl-24 pr-8 text-2xl font-semibold py-2 rounded-[50px] bg-gradient-to-r from-[#5998F2] to-[#5998F238]`}
`;

export const LogoContainer = styled.div`
  ${tw`flex items-center justify-center ml-5`}
`;

export const Logo = styled.figure`
  ${tw`w-[150px] my-1 flex items-center`}
`;

export const Search = styled.div`
  ${tw`relative max-w-[550px] w-full flex items-center`}
`;
export const SearchInput = styled.input`
  ${tw`bg-[#F8F8F8] text-lg rounded-[50px] pr-10 pl-5 py-2 w-full`}
  outline: none;
`;

export const SearchIcon = styled(BiSearchAlt)`
  ${tw`absolute hover:cursor-pointer text-[28px] text-[#002B98] mr-1.5 right-0`}
`;

export const Option = styled.div`
  ${tw`text-[25px] text-[#002B98] flex justify-between mr-5 items-center`}
`;

export const OptionSetting = styled(RiSettings3Fill)`
  ${tw`hover:cursor-pointer mx-2`}
`;

export const OptionLogOut = styled(FiLogOut)`
  ${tw`hover:cursor-pointer mx-2`}
`;

export const OptionNotify = styled(IoNotificationsCircleSharp)`
  ${tw`hover:cursor-pointer mx-2 text-[30px]`}
`
