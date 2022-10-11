import styled from "styled-components";
import tw from "twin.macro";
import { Form, Field } from "formik";
import { HiChevronLeft } from "react-icons/hi";

export const Suggest = styled.span`
  ${tw`text-lg mt-6`}
`;

export const NewForm = styled(Form)`
  ${tw`w-4/5`}
`;

export const Notify = styled.span`
  ${tw`w-[56%] italic text-base mt-6 text-center opacity-80`}
`;

export const TimeRemaining = styled.span`
  ${tw`block italic text-base mt-[54px] text-center`}
`;

export const Input = styled(Field)<{ error: boolean }>`
  ${tw`w-full h-12 outline-none mt-6 py-2 px-4`}
  ${({ error }) =>
    error === 1
      ? tw`border border-red-500`
      : tw`border-b border-solid border-[#0154b1]`};
`;

export const Button = styled.button`
  ${tw`w-1/3 h-11 bg-[#0154b1] text-[#fff] block rounded-md py-2 px-4 font-bold mb-11 mt-6 mx-auto hover:opacity-80`}
`;

export const SetWidth = styled.div`
  ${tw`w-full`}
`;

export const BackIcon = styled(HiChevronLeft)`
  ${tw`absolute text-4xl text-[#0154b1] left-7 top-7 cursor-pointer hover:opacity-80`}
`;
