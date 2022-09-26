import styled from "styled-components";
import tw from "twin.macro";
import { Form, Field } from "formik"
import { HiChevronLeft } from "react-icons/hi"

export const Suggest = styled.span`
    font-size: 18px;
    margin-top: 24px;
`;

export const Notify = styled.span`
    width: 56%;
    font-style: italic;
    font-size: 16px;
    margin-top: 24px;
    text-align: center;
    opacity: 0.8;
`

export const TimeRemaining = styled.span`
    display: block;
    font-style: italic;
    font-size: 16px;
    margin-top: 54px;
    text-align: center;
`

export const NewForm = styled(Form)`
    width: 80%;
`;

export const Input = styled(Field)`
    width: 100%;
    height: 50px;
    outline: none;
    margin-top: 24px;
    padding: 8px 16px;
    font-style: italic;
    border-bottom: 1px solid #0154b1;
`;

export const Button = styled.button`
    width: 32%;
    height: 44px;
    background-color: #0154b1;
    color: #fff;
    display: block;
    border-radius: 6px;
    padding: 8px 16px;
    font-weight: bold;
    margin: 20px auto 30px auto;
    &:hover {
        opacity: 0.8;
    }
`;

export const SetWidth = styled.div`
    width: 100%;
`;

export const BackIcon = styled(HiChevronLeft)`
    position: absolute;
    font-size: 36px;
    color: #0154b1;
    left: 28px;
    top: 28px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;