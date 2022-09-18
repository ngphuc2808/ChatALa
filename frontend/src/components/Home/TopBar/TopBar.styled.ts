import styled from "styled-components";
import tw from "twin.macro";
import { BiSearchAlt } from "react-icons/bi";
import { RiSettings3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

export const Avatar = styled.figure`
  ${tw`w-[75px] h-[75px] py-0.5 rounded-full overflow-hidden absolute flex`}
  border: 5px solid #77d1bc;
`;

export const Container = styled.div`
  ${tw`px-7 w-full flex items-center`}
`;

export const Wrapper = styled.div`
  ${tw`bg-[#C9D9E5] w-full rounded-[50px] grid grid-cols-8`}
`;

export const UserName = styled.div`
  ${tw`col-span-2 pl-24 pr-12 text-2xl font-semibold py-2 rounded-[50px] bg-gradient-to-r from-[#5998F2] to-[#5998F238] flex items-center`}
`;

export const LogoContainer = styled.div`
  ${tw`flex items-center justify-center`}
`;

export const Logo = styled.figure`
  ${tw`w-[150px] my-1 flex items-center`}
`;

export const Search = styled.div`
  ${tw`relative flex items-center col-start-5 col-span-2`}
`;
export const SearchInput = styled.input`
  ${tw`bg-[#F8F8F8] text-lg rounded-[50px] pr-10 pl-5 py-2 w-[500px]`}
  outline: none;
`;

export const SearchIcon = styled(BiSearchAlt)`
  ${tw`absolute hover:cursor-pointer text-[28px] text-[#002B98] mr-1.5 right-0`}
`;

export const Option = styled.div`
  ${tw`text-[25px] text-[#002B98] flex justify-end gap-5 mr-7 items-center col-start-8`}
`;

export const OptionSetting = styled(RiSettings3Fill)`
  ${tw`hover:cursor-pointer`}
`;

export const OptionLogOut = styled(FiLogOut)`
  ${tw`hover:cursor-pointer`}
`;
